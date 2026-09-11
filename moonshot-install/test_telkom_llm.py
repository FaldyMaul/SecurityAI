import requests
import json

url = "https://telkom-ai-dag.api.apilogy.id/Telkom-LLM/0.0.4/llm/chat/completions"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "x-api-key": "OQ8YaTsgtPL1MDkib93s6GYv03HtxFOo"
}

data = {
    "model": "telkom-ai",
    "messages": [
        {
            "role": "user",
            "content": "Hello, Good Morning"
        }
    ],
    "max_tokens": 1000,
    "temperature": 0,
    "stream": False
}

response = requests.post(url, headers=headers, json=data)

print(f"Status Code: {response.status_code}")
try:
    print("Response Body:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error parsing JSON: {e}")
    print(response.text)
