# -*- coding: utf-8 -*-
"""
Created on Sat Feb  8 10:48:38 2020

@author: Pavan
"""

import hypothesisTest.utilities as ut
import hypothesisTest.backtester as bt
import sys
from datetime import datetime
# from .hypothesisTest.utilities import print_results
# from .hypothesisTest import backtester as bt


params = dict()
# params['START DATE']                      = '2004-01-01'
# params['END DATE']                        = '2018-01-15'
# params['PORTFOLIO']                       = 'US_TOP_500_LIQUID'
# params['NEUTRALIZATION']                  = 'DOLLAR'
# params['LONG LEVERAGE']                   = 0.5
# params['SHORT LEVERAGE']                  = 0.5
# params['STARTING VALUE']                  = 20000000
# params['COST THRESHOLD BPS']              = 5
# params['ADV THRESHOLD PERCENTAGE']        = 10
# params['COMMISSION BPS']                  = 0.1
# params['STRATEGY EXPRESSION']             = '(High+Close)'#'mean(-rank(Volume)*(gauss_filter(High,5)-gauss_filter(Open,5)),5)'

params['START DATE']                      = sys.argv[1]
params['END DATE']                        = sys.argv[2]
params['PORTFOLIO']                       = sys.argv[3]
params['NEUTRALIZATION']                  = sys.argv[4]
params['LONG LEVERAGE']                   = float(sys.argv[5])
params['SHORT LEVERAGE']                  = float(sys.argv[6])
params['STARTING VALUE']                  = int(sys.argv[7])
params['COST THRESHOLD BPS']              = int(sys.argv[8])
params['ADV THRESHOLD PERCENTAGE']        = int(sys.argv[9])
params['COMMISSION BPS']                  = float(sys.argv[10])
params['STRATEGY EXPRESSION']             = sys.argv[11]
#params['STRATEGY EXPRESSION']             = '(High+Close)'#'mean(-rank(Volume)*(gauss_filter(High,5)-gauss_filter(Open,5)),5)'


if __name__ =="__main__":   
    try:
        start = datetime.now()
        results = bt.backtester(params)
        ut.print_results(results)
        end = datetime.now()
        time_taken = (end - start).total_seconds()
        message = "\n Backtesting completed successfully. Time taken :" + str(round(time_taken,2))+" Seconds"
        print(message)
    except:
        results = bt.backtester(ut.params_def)
        ut.print_results(results)
        ex_type, ex_value, _ = sys.exc_info()
        print("Exception type : %s " % ex_type.__name__)
        print("Exception message : %s" %ex_value)
        message = "Error in Backtesting"+' . Backtested Random Strategy'
        print(message)

        
