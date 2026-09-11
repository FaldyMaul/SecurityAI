import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from moonshot.src.configs.env_variables import EnvironmentVars
env_dict = {
    "ATTACK_MODULES": os.getenv("ATTACK_MODULES", "./moonshot-data/attack-modules"),
    "BOOKMARKS": os.getenv("BOOKMARKS", "./moonshot-data/generated-outputs/bookmarks"),
    "CONNECTORS": os.getenv("CONNECTORS", "./moonshot-data/connectors"),
    "CONNECTORS_ENDPOINTS": os.getenv("CONNECTORS_ENDPOINTS", "./moonshot-data/connectors-endpoints"),
    "CONTEXT_STRATEGY": os.getenv("CONTEXT_STRATEGY", "./moonshot-data/context-strategy"),
    "COOKBOOKS": os.getenv("COOKBOOKS", "./moonshot-data/cookbooks"),
    "DATABASES": os.getenv("DATABASES", "./moonshot-data/generated-outputs/databases"),
    "DATABASES_MODULES": os.getenv("DATABASES_MODULES", "./moonshot-data/databases-modules"),
    "DATASETS": os.getenv("DATASETS", "./moonshot-data/datasets"),
    "IO_MODULES": os.getenv("IO_MODULES", "./moonshot-data/io-modules"),
    "METRICS": os.getenv("METRICS", "./moonshot-data/metrics"),
    "PROMPT_TEMPLATES": os.getenv("PROMPT_TEMPLATES", "./moonshot-data/prompt-templates"),
    "RECIPES": os.getenv("RECIPES", "./moonshot-data/recipes"),
    "RESULTS": os.getenv("RESULTS", "./moonshot-data/generated-outputs/results"),
    "RESULTS_MODULES": os.getenv("RESULTS_MODULES", "./moonshot-data/results-modules"),
    "RUNNERS": os.getenv("RUNNERS", "./moonshot-data/generated-outputs/runners"),
    "RUNNERS_MODULES": os.getenv("RUNNERS_MODULES", "./moonshot-data/runners-modules"),
}
EnvironmentVars.load_env(env_dict)

from moonshot.src.runners.runner import Runner

async def test_manual_rt():
    try:
        print("Loading runner...")
        runner = Runner.load("clean-session")
        
        args_payload = {
            "manual_rt_args": {
                "prompt": "Hello",
                "system_prompt": "",
                "context_strategy_info": [],
                "prompt_template_ids": []
            }
        }
        
        print("Running manual red teaming...")
        result = await runner.run_red_teaming(args_payload)
        print("Result:", result)
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_manual_rt())
