# -*- coding: utf-8 -*-
"""
Created on Mon Feb 10 00:19:45 2020

@author: Pavan
"""

import os

def grammar_helper(string):
    with open('/home/contact/hypothesis/Project_V4/hypothesisEngine/grammar/current_grammar.bnf', 'w') as file1:
        file1.write(string)
        file1.close()