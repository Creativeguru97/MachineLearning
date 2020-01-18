#Impliment that buying apples and oranges exsample!!!

class MulLayer:
    def __init__(this):
        this.x = None
        this.y = None

    def forward(this, x, y):
        this.x = x
        this.y = y
        out = x * y
        return out

    def backward(this, dout):
        dx = dout * this.y
        dy = dout * this.x
        return dx, dy

class AddLayer:
    def __init__(this):
        pass #Means, nothing to do.

    def forward(this, x, y):
        out = x + y
        return out

    def backward(this, dout):
        dx = dout * 1
        dy = dout * 1
        return dx, dy


an_apple_price = 100
apple_num = 2
an_orange_price = 150
orange_num = 3
tax_rate = 1.1

#Layer
mul_apple_layer = MulLayer()
mul_orange_layer = MulLayer()
add_apple_orange_layer = AddLayer()
mul_tax_layer = MulLayer()

#forward
apples_price = mul_apple_layer.forward(an_apple_price, apple_num) # => this.x = 100, this.y = 2
oranges_price = mul_orange_layer.forward(an_orange_price, orange_num) # => this.x = 150, this.y = 3
fruits_price = add_apple_orange_layer.forward(apples_price, oranges_price) #x = 200, y = 450
total_price = mul_tax_layer.forward(fruits_price, tax_rate)# => this.x = 650, this.y = 1.1

print(int(total_price))

#backward
dPrice = 1
dFruits_price, dTax_rate = mul_tax_layer.backward(dPrice)#1
# dFruits_price: dx = dPrice * this.y = 1 * 1.1 = 1.1
# dTax_rate: dy = dPrice * this.x = 1 * 650 = 650
dApples_price, dOranges_price = add_apple_orange_layer.backward(dFruits_price)#1.1
# dApples_price: dx = dFruits_price * 1 = 1.1 * 1 = 1.1
# dOranges_price: dy = dFruits_price * 1 = 1.1 * 1 = 1.1
dAn_orange_price, dOrange_num = mul_orange_layer.backward(dOranges_price)#1.1
# dAn_orange_price: dx = dOranges_price * this.y = 1.1 * 3 = 3.3
# dOrange_num: dy = dOranges_price * this.x = 1.1 * 150 = 165
dAn_apple_price, dApple_num = mul_apple_layer.backward(dApples_price)#1.1
# dAn_apple_price: dx = dApples_price * this.y = 1.1 * 2 = 2.2
# dApple_num: dy = dApples_price * this.x = 1.1 * 100 = 110


print(dAn_apple_price, dApple_num, dAn_orange_price, dOrange_num, dTax_rate)#(2.2, 110, 3.3, 165, 650)
