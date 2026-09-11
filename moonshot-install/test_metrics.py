import traceback
from moonshot.src.metrics.metric import Metric

try:
    print("Loading lionguardclassifier...")
    Metric.load('lionguardclassifier')
    print("Success loading lionguardclassifier")
except Exception as e:
    print("Error loading lionguardclassifier:")
    traceback.print_exc()

try:
    print("Loading toxicity-classifier...")
    Metric.load('toxicity-classifier')
    print("Success loading toxicity-classifier")
except Exception as e:
    print("Error loading toxicity-classifier:")
    traceback.print_exc()
