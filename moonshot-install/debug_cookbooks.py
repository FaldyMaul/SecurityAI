from moonshot.src.api.api_cookbook import api_get_all_cookbook
import traceback

try:
    print(api_get_all_cookbook())
except Exception as e:
    print("Caught an exception:")
    traceback.print_exc()
