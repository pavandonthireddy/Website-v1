# -*- coding: utf-8 -*-
"""
Created on Sat Feb  8 15:44:58 2020

@author: Pavan
"""

import pandas as pd
import numpy as np


params_def = dict()
params_def['START DATE']                      = '2018-01-01'
params_def['END DATE']                        = '2018-01-15'
params_def['PORTFOLIO']                       = 'Dummy'
params_def['NEUTRALIZATION']                  = 'DOLLAR'
params_def['LONG LEVERAGE']                   = 0.5
params_def['SHORT LEVERAGE']                  = 0.5
params_def['STARTING VALUE']                  = 20000000
params_def['COST THRESHOLD BPS']              = 5
params_def['ADV THRESHOLD PERCENTAGE']        = 10
params_def['COMMISSION BPS']                  = 0.1
params_def['STRATEGY EXPRESSION']             = 'np.random.rand(10,5)'
        

def excel_list(file_name,sheet=0):
    # List = pd.read_excel(".\\Data\\"+file_name,sheet_name=sheet)
    List = pd.read_excel("/home/contact/hypothesis/Project_V4/Data/" + file_name, sheet_name=sheet)
    List = List['Variable'].tolist()
    return List

def shift(array, n,fill):
    shifted_array = np.empty_like(array)
    if n >= 0:
        shifted_array[:n,:] = fill
        shifted_array[n:,:] = array[:-n,:]
    else:
        shifted_array[n:,:] = fill
        shifted_array[:n,:] = array[-n:,:]
    return shifted_array



def shift_array(array,n,fill):
    shifted_array = np.empty_like(array)
    if n >= 0:
        shifted_array[:n] = fill
        shifted_array[n:] = array[:-n]
    else:
        shifted_array[n:] = fill
        shifted_array[:n] = array[-n:]
    return shifted_array
    

def millions(x, pos):
    'The two args are the value and tick position'
    return '$%1.1fM' % (x * 1e-6)

def to_datetime(date):
    from datetime import datetime
    """
    Converts a numpy datetime64 object to a python datetime object 
    Input:
      date - a np.datetime64 object
    Output:
      DATE - a python datetime object
    """
    timestamp = ((date - np.datetime64('1970-01-01T00:00:00'))
                 / np.timedelta64(1, 's'))
    return datetime.utcfromtimestamp(timestamp)


def millions_fmt(x):
    'The two args are the value and tick position'
    return '$%1.1f M' % (x * 1e-6)

def print_results(results):
    from pymongo import MongoClient
    import urllib.parse
    username = urllib.parse.quote_plus('nodedemo')
    password = urllib.parse.quote_plus('nodedemo')
    # client = MongoClient('mongodb://%s:%s@127.0.0.1' % (username, password))
    client = MongoClient('localhost', 27017)
    db = client['hypothesis']

    collection = db['plotdata']
    plotData = {}
    for key,value in results.items():
        oldKey = key
        if key not in ["CLASSIFICATION_DATA","FACTOR_RES","SHARPE_BS","PLOT_CURVES_DATA"]:
            if "." in key:
                key = oldKey.replace(".", "")
            plotData["{}".format(key)] = value

    plotData["CLASSIFICATION_DATA"] = results['CLASSIFICATION_DATA'].to_dict()
    plotData['FACTOR_RES'] = results['FACTOR_RES'].to_dict()

    cleanedSharpe_bs = []
    for i in list(results['SHARPE_BS']):
        cleanedSharpe_bs.append(list(i)[0])
    plotData["SHARPE_BS"] = cleanedSharpe_bs

    replaceIndex = []
    for i in results["PLOT_CURVES_DATA"].index:
        replaceIndex.append(str(i)[:10])
    columns = tuple(list(results["PLOT_CURVES_DATA"].columns))
    content = []
    for i in range(results["PLOT_CURVES_DATA"].shape[0]):
        content.append(tuple(list(results["PLOT_CURVES_DATA"].iloc[i])))
    plotData["PLOT_CURVES_DATA"] = pd.DataFrame(content, index=replaceIndex, columns=columns).to_dict()

    collection.insert_one(plotData)


