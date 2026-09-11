import asyncio
from moonshot.src.connectors_endpoints.connector_endpoint import ConnectorEndpoint
from moonshot.src.connectors_endpoints.connector_endpoint_arguments import ConnectorEndpointArguments
from moonshot.api import api_read_endpoint, api_set_environment_variables
from pydantic import ValidationError

async def main():
    try:
        print("Initializing Telkom AI endpoint...")
        # Set environment variables so moonshot knows where to look
        api_set_environment_variables(
            {
                "CONNECTORS": "d:/Work/PAM/SecurityAI/moonshot-install/moonshot-data/connectors/",
                "CONNECTORS_ENDPOINTS": "d:/Work/PAM/SecurityAI/moonshot-install/moonshot-data/connectors-endpoints/",
                "IO_MODULES": "d:/Work/PAM/SecurityAI/moonshot-install/moonshot-data/io-modules/",
            }
        )

        ep_args_dict = api_read_endpoint("telkom-ai")
        # Ensure ID is in there if expected
        if "id" not in ep_args_dict:
             ep_args_dict["id"] = "telkom-ai"

        ep_args = ConnectorEndpointArguments(**ep_args_dict)
        print("ConnectorEndpointArguments structure:")
        print(ep_args)
        
        ep = ConnectorEndpoint.create(ep_args) # Fix: passed ep_args instead of string
        print(f"Endpoint loaded: {ep.name} using {ep.connector_type}")

        prompt = "Hello, what is your name?"
        print(f"\nSending prompt: '{prompt}'")
        response = await ep.connector.get_response(prompt)
        print("\nResponse:")
        print(response.response)
    
    except ValidationError as e:
        print("Validation Error:")
        print(e.json())
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
