class TextMixer:
    """
    Concatenate multiple text inputs into a single STRING output.
    Input count adjustable at runtime via the widget.
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "inputs_count": ("INT", {"default": 3, "min": 1, "max": 50, "step": 1}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "mix"
    CATEGORY = "UnaCustom"

    def mix(self, inputs_count, **kwargs):
        parts = []
        for i in range(1, inputs_count + 1):
            t = kwargs.get(f"txt_{i}", "")
            if t:
                parts.append(str(t))
        return ("".join(parts),)