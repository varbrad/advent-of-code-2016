import hashlib
import re

p_input = "reyedfim"
password = [None] * 8
i = 0
filled = 0
regex = re.compile('^00000')

while filled < 8:
    hash = hashlib.md5(str(p_input + str(i)).encode("utf-8")).hexdigest()
    if regex.match(hash) is not None:
        pos = int(hash[5], 16)
        if pos < 8 and password[pos] is None:
            password[pos] = hash[6]
            filled = filled + 1
            print(password)
    i = i + 1
