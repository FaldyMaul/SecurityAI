import json
import urllib.request
import urllib.error
import time

url_create = "http://127.0.0.1:5000/api/v1/sessions"
# name, description, endpoints
data_create = json.dumps({"name": "clean-session", "description": "test", "endpoints": ["openai-gpt35-turbo"]}).encode("utf-8")
headers = {"Content-Type": "application/json"}

try:
    req = urllib.request.Request(url_create, data=data_create, headers=headers, method="POST")
    urllib.request.urlopen(req)
except Exception as e:
    pass

url_get = "http://127.0.0.1:5000/api/v1/sessions/clean-session"
try:
    urllib.request.urlopen(urllib.request.Request(url_get, method="GET"))
except:
    pass

url_post = "http://127.0.0.1:5000/api/v1/sessions/clean-session/prompt"
data_post = json.dumps({"history_length": 10, "user_prompt": "Hello"}).encode("utf-8")
try:
    req = urllib.request.Request(url_post, data=data_post, headers=headers, method="POST")
    with urllib.request.urlopen(req) as response:
        print(f"Response Status: {response.getcode()}")
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Other Error: {str(e)}")
