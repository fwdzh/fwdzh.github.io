# 2025 蓝桥杯国赛B组 C/C++

> 2025-06-15

这次来武汉软件职业技术学院比赛的，他们学校还挺大的，而且电脑也还行，还发了吃的，两个小面包，还有矿泉水需要可以拿。确实挺不错啊。

去年去湖北文理比赛的，也挺不错，但是是 win7 系统，cmd都不能粘贴的。。。也可能可以，但是是别的快捷键。。。反正很难受当时，而且我感觉当时应该写得也很烂，这次也是。

![](../../../../assets/maodie.gif)

难度放洛谷两个蓝一个绿其他全是黄。。。但是我3个黄没写出来，这也太菜了，还有一个是写过一模一样的原。另一个绿一眼数位DP，以前基本一题没写过，但是有类似的也见过，看了视频但没写吧，然后花了挺久写出来了，也勉强还行了。

[![pVAbjMQ.png](https://s21.ax1x.com/2025/06/15/pVAbjMQ.png)](https://imgse.com/i/pVAbjMQ)

## A

这个很简单了，毕竟填空题，打表就行，很容易写出 $2024 ^ 3$ 的 dp，几秒就能出结果。把LCM存数组里会更快，这个运算也挺费时间的，虽然是 log 复杂度。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int mod = int(1e9) + 7;
ll lcm(ll a, ll b)
{
    return a / __gcd(a, b) * b;
}
int LCM[2026][2026];
int main()
{
    for(int i = 1; i <= 2025; i++)
        for(int j = 1; j <= 2025; j++)
            LCM[i][j] = lcm(i, j);
    vector<int> dp(2026, 1);
    for(int k = 2; k <= 2025; k++){
        vector<int> ndp(2026);
        for(int x = 1; x <= 2025; x++){
            for(int y = 1; y <= 2025; y++){
                if(LCM[x][y] == 2025)
                    ndp[y] = (ndp[y] + dp[x]) % mod;
            }
        }
        dp = ndp;
    }
    ll ans = 0;
    for(int i = 1; i <= 2025; i++)
        ans = (ans + dp[i]) % mod;
    cout << ans << '\n';
    cout << 385787853 << '\n';
    return 0;
}
```

## C

手推一下，发现他那个操作，相当于是把数组循环左移 2 位。

而一开始是左移了 $k$ 位，所以我们必须要使得移动的总位数是 $n$ 的倍数才可以还原到最初的状态。

稍微分类讨论一下，若 $k$ 为奇数，则若 $n$ 为奇数，那最终 $n$ 次移动就行，否则差值始终为奇数，无法到达；若 $k$ 为偶数，则要么最终是移动 $n$ 位，要么是 $2n$ 。

其实比赛时和刚才，我都有点不太相信这是对的。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n, k;
    cin >> n >> k;
    k %= n;
    int ans = INT_MAX;
    if(k == 0) ans = min(ans, 0);
    if((n - k) % 2 == 0) ans = min(ans, (n - k) / 2);
    if((2 * n - k) % 2 == 0) ans = min(ans, (2 * n - k) / 2);
    if(ans == INT_MAX) ans = -1;
    cout << ans << '\n';
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T;
    cin >> T;
    while(T--)
        solve();
    return 0;
}
```

## D

又是很简单的 dp，对于大于 $2$ 的 $i$， $s_i$ 的答案会等于 $s_{i-2}$ 的答案 + $s_{i - 1}$ 的答案 + $s_{i-2}$ 中的 $1$ 的数量 * $s_{i - 1}$ 中的 $0$ 的数量。

所以可以直接递推得到答案，记得要预处理，否则 O(Tn) 会 T 的。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int N = int(1e5) + 10;
constexpr int mod = int(1e9) + 7;

int zeros[N], ones[N], ans[N];

void solve()
{
    int n;
    cin >> n;
    cout << ans[n] << '\n';
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    // 0 1
    zeros[1] = 1, ones[2] = 1;
    for(int i = 3; i < N; i++){
        zeros[i] = (zeros[i - 1] + zeros[i - 2]) % mod;
        ones[i] = (ones[i - 1] + ones[i - 2]) % mod;
        ans[i] = (ans[i - 1] + ans[i - 2]) % mod;
        ans[i] = (ans[i] + 1LL * ones[i - 2] * zeros[i - 1] % mod) % mod;
    }
    int T;
    cin >> T;
    while(T--)
        solve();
    return 0;
}
```

## F

一眼就是数位DP吧，就算我不会，也能看出来时是数位DP。。。但是其实数位DP基础的题目并不是很难。

我们只要能算出 $[1, l]$ 内满足条件的数字的数量，就可以通过二分求出最小的使得数量大于等于 $n$ 的数字是多少。

这个其实也不难求，把位数小于 $l$ 的数字加上，然后每一位是否贴着边界去取，如果取不到上限，则后面的位都可以随便去取了，因为无论如何都不会大于 $l$。记得如果 $l$ 本身就是一个满足条件的数字，则答案要 + 1，杭电春季赛有个题目跟这差不多，是一个异或的题目。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    vector<ll> f(18);
    f[0] = 1;
    for(int i = 1; i <= 17; i++)
        f[i] = f[i - 1] * 5;
    vector<ll> cnt(18);
    cnt[2] = 45;
    for(int i = 3; i <= 17; i++)
        cnt[i] = cnt[i - 1] * 5;
    
    auto get = [&](ll x){
        ll res = 0;
        string tmp = to_string(x);
        int len = tmp.size();
        vector<int> a(18);
        for(int i = 0; i < len; i++)
            a[i] = tmp[i] - '0';
        for(int i = 1; i < len; i++)
            res += cnt[i];
        res += (a[0] - 1) * f[len - 1];
        bool ok = true;
        for(int i = 1, p = (a[0] & 1) ^ 1; i < len; i++, p ^= 1){
            if((a[i] & 1) != p){
                int cnt = 0;
                for(int j = p; j < a[i]; j += 2)
                    cnt++;
                res += cnt * f[len - i -1];
                ok = false;
                break;
            }else{
                int cnt = 0;
                for(int j = p; j < a[i]; j += 2)
                    cnt++;
                res += cnt * f[len - i -1];
            }
        }
        if(ok) res++;
        return res;
    };
    ll n;
    cin >> n;
    ll lo = 9, hi = ll(1e17);
    while(lo < hi - 1){
        ll mid = (lo + hi) >> 1;
        if(get(mid) >= n) hi = mid;
        else lo = mid;
    }
    cout << hi << '\n';
    return 0;
}
```

## G

> 趁我还记得，扔一下原题链接，[CF1883E](https://codeforces.com/contest/1883/problem/E)，[洛谷P12642](https://www.luogu.com.cn/problem/P12642)。

原题，我记得写过一模一样的题目，但是没有找到题目链接。。。因为看了题解所以印象很深刻，于是一下就写出来了，不然应该要多想一会。

有群友找到洛谷原题链接，但我记得我写的不是那个，找不到很难受啊。但是发现CF也有个原题，但是我也没写过。。。都是和今天比赛这个题目是一模一样的。

我们就是可以把每个 $a_i$ 都让它刚好大于等于 $a_{i-1}$ 且小于 $2a_{i-1}$，它可能要除几次，因为可能一开始就很大。那么这之后，$a_{i - 1}$ 需要乘多少次，$a_i$ 就需要乘多少次。

好想知道当时写的那个题是哪个题，洛谷题解的代码就是这样写的，于是我比赛时有点印象就直接写了。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int n;
    cin >> n;
    vector<ll> a(n + 1), b(n + 1);
    for(int i = 1; i <= n; i++)
        cin >> a[i];
    ll ans = 0;
    for(int i = 2; i <= n; i++){
        ll x = a[i];
        while(x >= a[i - 1] * 2){
            x /= 2;
            b[i]--;
        }
        while(x < a[i - 1]){
            x *= 2;
            b[i]++;
        }
        b[i] += max(b[i - 1], 0LL);
        b[i] = max(b[i], 0LL);
        ans += b[i];
    }
    cout << ans << '\n';
    return 0;
}
```

## summary

感觉对于我来说，黄题写不出来有点太丢人了哈。。。虽然本来也很菜，但是这这有点抽象了。

其实本人对于自己没有很高的要求，写这篇博客也仅仅是为了记录生活。