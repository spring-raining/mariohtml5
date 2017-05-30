import math
import random

from agent import Agent

class SampleAgent(Agent):
    def on_init(self):
        pass

    def on_start(self, observation):
        return 0

    def on_step(self, reward, observation):
        actions = [0, 3, 5, 8, 10, 13, 15, 18]
        return actions[math.floor(random.random() * 8)]

    def on_end(self, reward):
        pass

    def on_message(self, text):
        pass

    def on_cleanup(self):
        pass

if __name__ == '__main__':
    agent = SampleAgent()

    agent.init()
    for i in range(30):
        agent.train()
    agent.cleanup()
