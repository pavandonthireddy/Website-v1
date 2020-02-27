from hypothesisEngine.stats.stats import get_stats
from hypothesisEngine.algorithm.parameters import params, set_params, hypothesis_params
from hypothesisEngine.utilities.log_helper import start, stop
from hypothesisEngine.utilities.grammar_helper import grammar_helper
from datetime import datetime
import sys
import warnings
warnings.filterwarnings("ignore")

params['CFG']                       = sys.argv[11]
print("Grammar: " + sys.argv[11])
params['FITNESS_FUNCTION']          = sys.argv[12]
params['MAX_INIT_TREE_DEPTH']       = int(sys.argv[13])
# params['MIN_INIT_TREE_DEPTH']       = int(sys.argv[14])
params['MIN_INIT_TREE_DEPTH']       = None
params['INIT_GENOME_LENGTH']        = int(sys.argv[15])
params['INTERACTION_PROBABILITY']   = float(sys.argv[16])
params['MAX_TREE_DEPTH']            = int(sys.argv[17])
params['MAX_TREE_NODES']            = int(sys.argv[18])
params['POPULATION_SIZE']           = int(sys.argv[19])
params['SELECTION_PROPORTION']      = float(sys.argv[20])
params['GENERATIONS']               = int(sys.argv[21])
params['GENERATION_SIZE']           = int(sys.argv[22])
params['ELITE_SIZE']                = int(sys.argv[23])
params['CROSSOVER_PROBABILITY']     = float(sys.argv[24])
params['MUTATION_EVENTS']           = int(sys.argv[25])
params['MUTATION_PROBABILITY']      = float(sys.argv[26])
params['TOURNAMENT_SIZE']           = int(sys.argv[27])
params['RANDOM_SEED']               = int(sys.argv[28])
params['fileName'] = sys.argv[29]
fileName = sys.argv[29]

# params['CFG']                       = \
#                                         """<expr>  ::= (<foptr>(<expr>,<expr>,<day>))| 
#                                                     (<fopbi>(<expr>,<day>))| 
#                                                     (<fopun>(<expr>))| 
#                                                     (<expr><matbi><expr>)  |
#                                                     <var>
#                                         <foptr> ::= corr | covariance
#                                         <fopbi> ::= mean | 
#                                                     median |   
#                                                     stdev| 
#                                                     back_diff| 
#                                                     center| 
#                                                     compress| 
#                                                     scale| 
#                                                     normalize_o|       
#                                                     zscore|     
#                                                     sma|
#                                                     ema| 
#                                                     fisher_norm| 
#                                                     maxval| 
#                                                     minval|       
#                                                     gauss_filter|
#                                                     ts_rank|
#                                                     skew|
#                                                     kurtosis
#                                         <fopun> ::= fisher|invfisher|rank| -1* | 1/ |smooth
#                                         <matbi> ::= + | - | * | /
#                                         <var> ::= Open|High|Low|Close
#                                         <day> ::=  5 | 10 | 15 | 20
#                                         """
# params['FITNESS_FUNCTION']          = "MAR_Ratio"
# params['MAX_INIT_TREE_DEPTH']       = 10
# params['MIN_INIT_TREE_DEPTH']       = None
# params['INIT_GENOME_LENGTH']        = 200
# params['INTERACTION_PROBABILITY']   = 0.5
# params['MAX_TREE_DEPTH']            = 10
# params['MAX_TREE_NODES']            = 10
# params['POPULATION_SIZE']           = 100
# params['SELECTION_PROPORTION']      = 0.25
# params['GENERATIONS']               = 49
# params['GENERATION_SIZE']           = 99
# params['ELITE_SIZE']                = 1
# params['CROSSOVER_PROBABILITY']     = 0.4
# params['MUTATION_EVENTS']           = 1
# params['MUTATION_PROBABILITY']      = 0.1
# params['TOURNAMENT_SIZE']           = 2
# params['RANDOM_SEED']               = 606632
# params['fileName'] = 'aahello.txt'

"""
Hypothesis Parameters
"""

hypothesis_params['START DATE']                      = sys.argv[1]
hypothesis_params['END DATE']                        = sys.argv[2]
hypothesis_params['PORTFOLIO']                       = sys.argv[3]
hypothesis_params['NEUTRALIZATION']                  = sys.argv[4]
hypothesis_params['LONG LEVERAGE']                   = float(sys.argv[5])
hypothesis_params['SHORT LEVERAGE']                  = float(sys.argv[6])
hypothesis_params['STARTING VALUE']                  = int(sys.argv[7])
hypothesis_params['COST THRESHOLD BPS']              = int(sys.argv[8])
hypothesis_params['ADV THRESHOLD PERCENTAGE']        = int(sys.argv[9])
hypothesis_params['COMMISSION BPS']                  = float(sys.argv[10])

# hypothesis_params['START DATE']                      = '2004-01-01'
# hypothesis_params['END DATE']                        = '2018-01-15'
# hypothesis_params['PORTFOLIO']                       = 'US_TOP_500_LIQUID'
# hypothesis_params['NEUTRALIZATION']                  = 'DOLLAR'
# hypothesis_params['LONG LEVERAGE']                   = 0.5
# hypothesis_params['SHORT LEVERAGE']                  = 0.5
# hypothesis_params['STARTING VALUE']                  = 20000000
# hypothesis_params['COST THRESHOLD BPS']              = 5
# hypothesis_params['ADV THRESHOLD PERCENTAGE']        = 10
# hypothesis_params['COMMISSION BPS']                  = 0.1

if __name__ =="__main__": 
    # try:
    grammar_helper(params['CFG'])
    print(params['fileName'])
    start('/home/contact/hypothesis/Project_V4/hypothesisEngine/logs/'+'log_'+datetime.now().strftime("%Y_%m_%d_%H_%M_%S")+'.txt')   
    set_params(sys.argv[1:])
    print("Hey")
    print(params['fileName'])   
    individuals = params['SEARCH_LOOP']()    
    get_stats(individuals, end=True)    
    stop()
    # except:
    #     ex_type, ex_value, _ = sys.exc_info()
    #     print("Exception type : %s " % ex_type.__name__)
    #     print("Exception message : %s" % ex_value)
    #     message = "Evolution failed."+' .Please check the parameters.'
    #     print(message)
    #     stop()