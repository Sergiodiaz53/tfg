from zipfile import ZipFile

filepath = '/Users/sifaw/Desktop/bulk-file.zip'

with ZipFile(filepath) as z:
    for name in z.namelist():
        print(name)
