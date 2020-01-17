#Impliment that buying apples exsample!!!

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


an_apple_price = 100
apple_num = 2
tax_rate = 1.1

#Layer
mul_apple_layer = MulLayer()
mul_tax_layer = MulLayer()

#forward
apples_price = mul_apple_layer.forward(an_apple_price, apple_num) # => this.x = 100, this.y = 2
total_price = mul_tax_layer.forward(apples_price, tax_rate)# => this.x = 200, this.y = 1.1

print(int(total_price))

#backward
dPrice = 1
dApples_price, dTax_rate = mul_tax_layer.backward(dPrice)#1
#dApples_price: dx = dPrice * this.y = 1 * 1.1 = 1.1
#dTax_rate: dy = dPrice * this.x = 1 * 200 = 200
dAn_apple_price, dApple_num = mul_apple_layer.backward(dApples_price)#1.1
# dAn_apple_price: dx = dApples_price * this.y = 1.1 * 2 = 2.2
# dApple_num: dy = dApples_price * this.x = 1.1 * 100 = 110

print(dApples_price, dApple_num, dTax_rate)#(2.2, 110, 200)
