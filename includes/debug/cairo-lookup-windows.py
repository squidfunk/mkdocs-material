import os

library_names = ("cairo-2", "cairo", "libcairo-2")
filenames = ("libcairo.so.2", "libcairo.2.dylib", "libcairo-2.dll")
first_found = ""
names = []

for name in library_names:
    if name.lower().endswith(".dll"):
        names += [name]
    else:
        names += [name, name + ".dll"]

for name in names:
    for path in os.environ["PATH"].split(os.pathsep):
        resolved_path = os.path.join(path, name)
        if os.path.exists(resolved_path):
            print(f"Found: {resolved_path}")
            if not first_found:
                first_found = resolved_path
            continue
        print(f"Doesn't exist: {resolved_path}")
    print("---")

if first_found:
    filenames = (first_found,) + filenames

print(f"The path is {first_found or 'not found'}")
print("List of files that FFI will try to load:")
for filename in filenames:
    print("-", filename)
