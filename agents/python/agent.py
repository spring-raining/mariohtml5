import base64
from io import BytesIO

import numpy as np
from PIL import Image
import requests

action_keys = [
    '',
    'left',
    'up',
    'right',
    'down',
    's',
    's,left',
    's,up',
    's,right',
    's,down',
    'a',
    'a,left',
    'a,up',
    'a,right',
    'a,down',
    's,a',
    's,a,left',
    's,a,up',
    's,a,right',
    's,a,down',
]

class Agent:

    game_url = 'http://127.0.0.1:6000'

    def init(self):
        self.on_init()

    def train(self):
        requests.post(self.game_url + '/init')

        # get first game image
        r = requests.post(self.game_url + '/action').json()
        arr = self.base64_to_arary(r['image'])
        action = self.on_start(arr)

        while True:
            r = requests.post(self.game_url + '/action', params={'keys': action_keys[action]}).json()
            arr = self.base64_to_arary(r['image'])
            if r['death'] or r['win']:
                break
            action = self.on_step(0, arr)

        self.on_end(0)

    def message(self, text):
        self.on_message(text)

    def cleanup(self):
        self.on_cleanup()

    def base64_to_arary(self, datauri):
        _, data = datauri.split(',')
        img = Image.open(BytesIO(base64.b64decode(data)))
        rgba = np.asarray(img)
        return rgba.transpose(2, 0, 1)[:3]

    # Called when initializes agent
    def on_init(self):
        raise NotImplementedError()

    # Called when starts new game episode
    # It must return next action
    def on_start(self, observation):
        raise NotImplementedError()

    # Called when processes existing game episode
    # It must return next action
    def on_step(self, reward, observation):
        raise NotImplementedError()

    # Called when ends existing game episode
    def on_end(self, reward):
        raise NotImplementedError()

    # Called when receives some messages
    def on_message(self, text):
        raise NotImplementedError()

    # Called when terminates agent
    def on_cleanup(self):
        raise NotImplementedError()
