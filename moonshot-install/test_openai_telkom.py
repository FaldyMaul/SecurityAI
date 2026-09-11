import asyncio
from openai import AsyncOpenAI

async def test():
    client = AsyncOpenAI(
        api_key="dummy", # to satisfy AsyncOpenAI API key requirement
        base_url="https://telkom-ai-dag.api.apilogy.id/Telkom-LLM/0.0.4/llm/",
        default_headers={"x-api-key": "OQ8YaTsgtPL1MDkib93s6GYv03HtxFOo"}
    )
    
    response = await client.chat.completions.create(
        model="telkom-ai",
        messages=[{"role": "user", "content": "Hello, Good Morning"}],
        max_tokens=1000,
        temperature=0
    )
    
    print(response.choices[0].message.content)

asyncio.run(test())
