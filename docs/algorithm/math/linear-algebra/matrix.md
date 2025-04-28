# 矩阵

## 矩阵乘法

两个矩阵 两个大小分别为 $m \times n$ 和 $n \times p$ 的矩阵 $A,B$ 相乘的结果为一个大小为 $m \times p$ 的矩阵。将结果矩阵记作 $C$ , 则 $C$ 第 $i$ 行， 第 $j$ 列的元素可以表示为

$$
C_{i,j} = \sum_{k=1}^{n} A_{i,k} B_{k,j}
$$

矩阵乘法满足分配律和结合律， 但是不满足交换律。

$A^{k}$ 相当于是 $k$ 个 $A$ 矩阵相乘， $A^0$ 的结果是单位矩阵。 单位矩阵就是主对角线上全为 $1$ , 其他元素全为 $0$ 的矩阵。

由于矩阵乘法满足分配律结合律， 所以 $A^k$ 也可以通过快速幂来加速运算。

### [P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)

```cpp
constexpr int mod = int(1e9) + 7;

void ChatGptDeepSeek() // Date: 2025-04-28
{                      // Time: 16:37:41 
    int n;
    ll k;
    cin >> n >> k;
    vector<vl> a(n + 1, vl(n + 1));
    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= n; j++)
            cin >> a[i][j];
    }
    auto matrix_ksm = [&](){
        vector<vl> res(n + 1, vl(n + 1));
        for(int i = 1; i <= n; i++) res[i][i] = 1;
        while(k){
            if(k&1){
                vector<vl> tmp(n + 1, vl(n + 1));
                for(int i = 1; i <= n; i++){
                    for(int j = 1; j <= n; j++){
                        for(int k = 1; k <= n; k++){
                            tmp[i][j] = (tmp[i][j] + res[i][k] * a[k][j] % mod) % mod;
                        }
                    }
                }
                res = tmp;
            }
            {
                vector<vl> tmp(n + 1, vl(n + 1));
                for(int i = 1; i <= n; i++){
                    for(int j = 1; j <= n; j++){
                        for(int k = 1; k <= n; k++){
                            tmp[i][j] = (tmp[i][j] + a[i][k] * a[k][j] % mod) % mod;
                        }
                    }
                }
                a = tmp;
            }
            k >>= 1;
        }
        return res;
    };
    vector ans = matrix_ksm();
    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= n; j++)
            cout << ans[i][j] << " \n"[j == n];
    }
}
```

### [P1962 斐波那契数列](https://www.luogu.com.cn/problem/P1962)

可以推一下式子， 会变成矩阵乘法。

```cpp
constexpr int mod = int(1e9)+7;
void ChatGptDeepSeek() // Date: 2025-04-28
{                      // Time: 17:32:58 
    ll n;
    cin >> n;
    vector<vl> res(3, vl(3));
    vector<vl> a(3, vl(3));
    a[1][1] = a[1][2] = a[2][1] = 1;
    res[1][1] = res[2][2] = 1;
    n--;
    while(n){
        if(n&1){
            vector<vl> tmp(3,vl(3));
            for(int i=1;i<=2;i++){
                for(int j=1;j<=2;j++){
                    for(int k=1;k<=2;k++){
                        tmp[i][j]=(tmp[i][j]+res[i][k]*a[k][j]%mod)%mod;
                    }
                }
            }
            res=tmp;
            // for(int i=1;i<=2;i++)
            //     for(int j=1;j<=2;j++)
            //         cout<<res[i][j]<<" \n"[j==2];
        }
        {
            vector<vl> tmp(3,vl(3));
            for(int i=1;i<=2;i++){
                for(int j=1;j<=2;j++){
                    for(int k=1;k<=2;k++){
                        tmp[i][j]=(tmp[i][j]+a[i][k]*a[k][j]%mod)%mod;
                    }
                }
            }
            a=tmp;
        }
        n>>=1;
    }
    //[1,0] 
    cout << res[1][1] << '\n';
}
```