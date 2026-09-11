import traceback
try:
    from moonshot.src.api.api_cookbook import api_get_all_cookbook
except Exception as e:
    with open('meta_err.txt', 'w') as f:
        traceback.print_exc(file=f)
