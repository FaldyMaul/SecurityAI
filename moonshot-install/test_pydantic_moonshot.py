import asyncio
from moonshot.src.connectors.connector_response import ConnectorResponse
from moonshot.src.connectors.connector_prompt_arguments import ConnectorPromptArguments

def main():
    try:
        print("Testing ConnectorResponse...")
        cr = ConnectorResponse(response="Hello from AI", context=[])
        print("CR:", cr)
        print("CR dict:", cr.to_dict())
        
        print("Testing ConnectorPromptArguments...")
        cpa = ConnectorPromptArguments(
            prompt_index=0,
            prompt="Hello",
            target="Hi",
            predicted_results=cr,
            duration=1.0
        )
        print("CPA:", cpa)
        
        # moonshot calls .to_dict(), but CPA doesn't have it natively, it might use model_dump or dict
        if hasattr(cpa, "to_dict"):
            print("CPA to_dict:", cpa.to_dict())
        else:
            print("CPA dict:", cpa.dict())
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
