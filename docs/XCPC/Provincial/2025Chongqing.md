# 第十三届重庆市大学生程序设计竞赛

> 2025-05-12

gym: https://codeforces.com/gym/105887

这场做得挺顺，只写了两小时，五题。

但这写了的几题难度都太低，难点的不好做。

## A

操作次数是不会超过 $log n$ 次的，所以直接改就行。

```cpp
#include<bits/stdc++.h>
using namespace std;

// mt19937_64 rng(time(NULL));

// int rand_interger(int l,int r)
// {
//     uniform_int_distribution<int>dis(l, r);
//     return dis(rng);
// }
void solve()
{
    int n;
    cin >> n;
    // n = rand_interger(90000,100000);
    // cout << n << '\n';
    vector<int> a(n);
    for(int i = 0; i < n; i++){
        cin >> a[i];
        // a[i] = rand_interger(1, int(1e9));
    }
    if(*max_element(a.begin(), a.end()) == *min_element(a.begin(), a.end())){
        cout << "0\n";
        return;
    }
    vector<int> b(a);
    for(int t = 1;t <= n; t++){
        int mx = 0, mn = int(2e9);
        for(int j = 0; j < n; j++){
            a[j] |= b[(j + t) % n];
            mx = max(mx, a[j]);
            mn = min(mn, a[j]);
        }
        if(mx == mn){
            cout << t << '\n';
            return;
        }
        b = a;
    }
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

## C

我想到的是，对于第 $i$ 行，如果是奇数，那么奇数位全填 $i$， 否则偶数位全填 $i$，然后其余位填列数 $j$。那么这样在每一行 $i$，在这一行里它会和所有奇偶不同的数字相邻，然后它的下一行或者上一行都是和它奇偶相同的数字在原位置，所以它能和所有奇偶和它相同的数字相邻。

这样我们就能达到最多的 $n$ 种颜色了。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= n; j++){
            if((j & 1) == (i & 1)) cout << i << " ";
            else cout << j << " ";
        }
        cout << '\n';
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    cin >> T;
    
    while(T--)
        solve();
    return 0;
}
```

## F

这是真签到题了。

```cpp
#include<bits/stdc++.h>
using namespace std;

void solve()
{
    int a, b, c;
    cin >> a >> b >> c;
    if(a > b) cout << "Win\n";
    else if(c > b) cout << "WIN\n";
    else cout << "nowin\n";
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

## H

若不存在上下全贴着且交叉的，则一定可以，简单画下然后猜猜。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int, int>;

void solve()
{
    int n;
    cin >> n;
    vector<int> a(n + 1), b(n + 1), c(n + 1), p(n + 1);
    for(int i = 1; i <= n; i++) cin >> a[i];
    for(int i = 1; i <= n; i++){
        cin >> b[i];
        p[b[i]] = i;
    }
    for(int i = 1; i <= n; i++) cin >> c[i];
    vector<pii> info;
    for(int i = 1; i <= n; i++)
        if(c[i]) info.push_back({i, p[a[i]]});
    int R = 0;
    for(auto [l, r] : info){
        if(r < R){
            cout << "No\n";
            return;
        }
        R = max(R, r);
    }
    cout << "Yes\n";
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    cin >> T;
    
    while(T--)
        solve();
    return 0;
}
```

## L

注意是栈，所以你 repeat 的话，一定是把栈里面的东西复制了一份的。就也挺简单的。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int N = int(2e5);
constexpr int mod = 998244353;

void solve()
{
    int n;
    cin >> n;
    vector<int> stk;
    ll ans = 0;
    for(int i = 1; i <= n; i++){
        // cout << "size: " << stk.size() << '\n';
        string op;
        cin >> op;
        if(op == "Push"){
            int x;
            cin >> x;
            ans = (ans + x) % mod;
            stk.push_back(x);
        }else if(op == "Pop"){
            ans = (ans - stk.back()) % mod;
            stk.pop_back();
            ans = (ans + mod) % mod;
        }else{
            ans = ans * 2 % mod;
            if(stk.size() && stk.size() < n){
                int siz = stk.size();
                for(int j = 0; j < siz; j++)
                    stk.push_back(stk[j]);
            }
        }
        cout << ans << '\n';
    }
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    // cin >> T;
    while(T--)
        solve();
    return 0;
}
```