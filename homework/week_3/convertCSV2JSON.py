import csv
import json
import pandas as pd


def convert(filename):
    df = pd.read_csv(filename, header=0, delimiter=";")
    df = df.to_json('bevolking.json',orient = "index")

convert("bevolking1.csv")