import traceback
try:
    import ragas
    print('Ragas imported successfully.')
except Exception as e:
    with open('ragas_err.txt', 'w') as f:
        traceback.print_exc(file=f)
