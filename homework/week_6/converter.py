import csv
import json
import pandas as pd


def convert(filename):
    df = pd.read_csv(filename, header=1, delimiter=";")
    df = df.to_json('woning.json',orient = "columns")


convert("woningsoort.csv")

# //groupby
# // to_json --> index