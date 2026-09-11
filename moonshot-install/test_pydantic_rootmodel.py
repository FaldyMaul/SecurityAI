from pydantic import BaseModel, RootModel
import nest_asyncio
nest_asyncio.apply()
import asyncio

class ChatRecord(BaseModel):
    conn_id: str
    prompt: str
    prepared_prompt: str
    predicted_result: str
    duration: str
    prompt_time: str

class PromptInfo(BaseModel):
    current_runner_id: str
    current_chats: dict[str, list[ChatRecord]]
    current_batch_size: int
    current_status: str

# Create PromptResponseModel exactly like moonshot
PromptResponseModel = RootModel[PromptInfo]

response = {
    'current_runner_id': 'test-runner',
    'current_chats': {
        'openai-gpt35-turbo': [{
            'conn_id': 'openai-gpt35-turbo',
            'prompt': 'Hello',
            'prepared_prompt': 'Hello',
            'predicted_result': 'Hello!',
            'duration': '1.3056071999963024',
            'prompt_time': '2026-03-05 13:00:54.673752'
        }]
    },
    'current_batch_size': 0,
    'current_status': 'COMPLETED'
}

def main():
    try:
        validated = PromptResponseModel.model_validate(response)
        print("Validated RootModel:", validated)
        # Simulate FastAPI jsonable_encoder
        from fastapi.encoders import jsonable_encoder
        json_data = jsonable_encoder(validated)
        print("FastAPI Encode:", json_data)
        
        # Test also model_dump
        print("model_dump:", validated.model_dump(by_alias=None))
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
