import asyncio
import os
from dotenv import load_dotenv
load_dotenv()

# Simulate Moonshot environment
import moonshot.integrations.web_api.app
from openai import AsyncOpenAI
from transformers import pipeline

async def main():
    print("Loading transformers pipeline...")
    try:
        # Load a small model or just the pipeline to see if it affects Pydantic
        # toxic_gen = pipeline("text-generation", model="theastronuts/toxic_sentence_generator")
        # Let's just load the pipeline first
        p = pipeline("sentiment-analysis")
        print("Pipeline loaded.")
    except Exception as e:
        print(f"Transformers error: {e}")

    client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    new_params = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello"}],
        "temperature": 0.5,
        "timeout": 300
    }
    
    print("Calling OpenAI...")
    try:
        response = await client.chat.completions.create(**new_params)
        print("Success:", response.choices[0].message.content)
    except Exception as e:
        import traceback
        print("Caught error:")
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
