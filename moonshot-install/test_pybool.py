from pydantic import BaseModel

class TestModel(BaseModel):
    name: str

m = TestModel(name="test")
try:
    print("Calling model_dump(by_alias=None)...")
    m.model_dump(by_alias=None)
except Exception as e:
    print(f"Caught error: {e}")
    import traceback
    traceback.print_exc()
