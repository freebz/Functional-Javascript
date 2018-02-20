-- A.2.4 엘름

hi name = plainText ("Hello " + name + "!")

-- Type error (Line 1, Column 11):
-- String is not a {Float,Int}
-- In context: + "Hello "



hi name = plainText("Hello " ++ name ++ "!")

main = hi "Elm"

-- (page text) Hello Elm!
