from .text_mixer_node import TextMixer

NODE_CLASS_MAPPINGS = {
    "TextMixer": TextMixer,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "TextMixer": "Text Mixer (Concat)",
}

WEB_DIRECTORY = "./js"