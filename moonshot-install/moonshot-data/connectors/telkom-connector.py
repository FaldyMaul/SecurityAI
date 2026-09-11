import os
from typing import Any

from moonshot.src.connectors.connector import Connector, perform_retry
from moonshot.src.connectors.connector_response import ConnectorResponse
from moonshot.src.connectors_endpoints.connector_endpoint_arguments import (
    ConnectorEndpointArguments,
)
from openai import AsyncOpenAI


class TelkomConnector(Connector):
    def __init__(self, ep_arguments: ConnectorEndpointArguments):
        # Initialize super class
        super().__init__(ep_arguments)

        # Initialize the AsyncOpenAI client with the API key and base URL. The API key is selected from the token
        # attribute if available; otherwise, it defaults to the TELKOM_API_KEY environment variable.
        api_key = self.token or os.getenv("TELKOM_API_KEY") or ""
        self._client = AsyncOpenAI(
            api_key=api_key, # OpenAI package still requires this, even if unused by Telkom API directly when x-api-key is present
            base_url=self.endpoint if self.endpoint and self.endpoint != "" else None,
            default_headers={"x-api-key": api_key}
        )

    @Connector.rate_limited
    @perform_retry
    async def get_response(self, prompt: str) -> ConnectorResponse:
        connector_prompt = f"{self.pre_prompt}{prompt}{self.post_prompt}"
        if self.system_prompt:
            openai_request = [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": connector_prompt},
            ]
        else:
            openai_request = [{"role": "user", "content": connector_prompt}]

        # Merge self.optional_params with additional parameters
        new_params = {
            **self.optional_params,
            "model": self.model,
            "messages": openai_request,
            "timeout": self.timeout,
        }
        try:
            response = await self._client.chat.completions.create(**new_params)
            return ConnectorResponse(response=await self._process_response(response))
        except Exception as e:
            err_msg = str(e).lower()
            if any(kw in err_msg for kw in ["blocked", "permission", "denied", "safety", "violation", "policy", "guardrail", "filter"]):
                return ConnectorResponse(response="Your request was blocked.")
            raise e

    async def _process_response(self, response: Any) -> str:
        return response.choices[0].message.content
