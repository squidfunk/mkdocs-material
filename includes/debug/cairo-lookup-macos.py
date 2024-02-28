import os
from ctypes.macholib import dyld
from itertools import chain

library_names = ("cairo-2", "cairo", "libcairo-2")
filenames = ("libcairo.so.2", "libcairo.2.dylib", "libcairo-2.dll")
first_found = ""
names = []

for name in library_names:
    names += [
        "lib%s.dylib" % name,
        "%s.dylib" % name,
        "%s.framework/%s" % (name, name),
    ]

for name in names:
    for path in dyld.dyld_image_suffix_search(
        chain(
            dyld.dyld_override_search(name),
            dyld.dyld_executable_path_search(name),
            dyld.dyld_default_search(name),
        )
    ):
        if os.path.isfile(path):
            print(f"Found: {path}")
            if not first_found:
                first_found = path
            continue

        try:
            if dyld._dyld_shared_cache_contains_path(path):
                print(f"Found: {path}")
                if not first_found:
                    first_found = path
                continue
        except NotImplementedError:
            pass

        print(f"Doesn't exist: {path}")
    print("---")

if first_found:
    filenames = (first_found,) + filenames

print(f"The path is {first_found or 'not found'}")
print("List of files that FFI will try to load:")
for filename in filenames:
    print("-", filename)
