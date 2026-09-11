import asyncio
from moonshot.src.connectors_endpoints.connector_endpoint import ConnectorEndpoint
from moonshot.src.connectors_endpoints.connector_endpoint_arguments import ConnectorEndpointArguments
from moonshot.api import api_read_endpoint, api_set_environment_variables, api_create_connector_from_endpoint
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

        connector = api_create_connector_from_endpoint("telkom-ai")
        print(f"Connector loaded: using {connector.__class__.__name__}")

        prompt = "Hello, what is your name?"
        print(f"\nSending prompt: '{prompt}'")
        response = await connector.get_response(prompt)
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
