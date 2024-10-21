while True:
    x = input("a to add, r to read, q to quit: ")
    if x == "q":
        break
    elif x =="a":
        y = input("username: ")
        yy = input("password: ")
        fname = y + ".secs"
        f = open(fname, "w")
        f.write(yy)
        f.close()
        print("added")
        print("dont forget to also add new users in gigachat/user.txt")

    elif x == "r":
        xx = input("username: ")
        filename = xx + ".secs"
        print(filename)
        file = open(filename, "r")
        r = file.read()
        print(r)
        file.close()


