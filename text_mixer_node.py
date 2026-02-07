class TextMixer:
    """
    Concatenate multiple text inputs into a single STRING output.
    Inputs auto-expand: connect to the spare slot and a new one appears.
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "separator": (["newline", "paragraph", "none", "space", "comma"],),
            },
            "optional": {
                "txt_1": ("STRING", {"default": "", "forceInput": True}),
                "txt_2": ("STRING", {"default": "", "forceInput": True}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "mix"
    CATEGORY = "UnaCustom"

    SEPARATOR_MAP = {
        "newline": "\n",
        "paragraph": "\n\n",
        "none": "",
        "space": " ",
        "comma": ", ",
    }

    def mix(self, separator, **kwargs):
        parts = []
        i = 1
        while f"txt_{i}" in kwargs:
            t = kwargs[f"txt_{i}"]
            if t:
                parts.append(str(t))
            i += 1
        return (self.SEPARATOR_MAP[separator].join(parts),)
