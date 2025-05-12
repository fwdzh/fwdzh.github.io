# 2025年北京市大学生程序设计竞赛暨“小米杯”全国邀请赛

> 2025-05-06

gym: https://codeforces.com/gym/105851

[![pEXuMgU.png](https://s21.ax1x.com/2025/05/12/pEXuMgU.png)](https://imgse.com/i/pEXuMgU)

新队伍的第一场比赛，有个队友有事来不了。这场邀请赛挺难。也是有的题没补。

## A

签到，只需要稍微讨论下。当时状态不太好来着，最近还是得好好休息下。

```cpp
#include<bits/stdc++.h>
using namespace std;

void solve()
{
    int n;
    cin >> n;
    string s;
    cin >> s;
    if(s[0] != s[n - 1]){
        cout << "empty\n";
        return;
    }
    if(n == 1){
        cout << s << '\n';
        return;
    }

    if(s[0] == '0'){
        // 010010010
        int ans = n, cnt = 0;
        for(int i = 0; i < n; i++){
            if(s[i] == '1'){
                ans = min(ans, cnt);

                cnt = 0;
            }else cnt++;
        }
        ans = min(ans, cnt);
        if(ans == 0){
            cout << "empty\n";
            return;
        }
        cout << string(ans, '0') << '\n';
    }else{
        // 111101110111
        int ans = n, cnt = 0;
        for(int i = 0; i < n; i++){
            if(s[i] == '0'){
                ans = min(ans, cnt);

                cnt = 0;
            }else cnt++;
        }
        ans = min(ans, cnt);
        if(ans == 0){
            cout << "empty\n";
            return;
        }
        cout << string(ans, '1') << '\n';
    }//0010001110100
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

这题还挺巧妙的，想了一会。跟二进制有关，如果你有每个 $2^i$ 这些重量的砝码，那么一定可以表示出每一个重量。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n, m;
    cin >> n >> m;
    if(m < __lg(n) + 1){
        cout << "-1\n";
        return;
    }
    ll ans = ll(2e10);
    for(int i = 0; i <= __lg(n); i++){
        ll max_val = (1LL << (i + 1)) - 1;
        if(max_val > n) break;
        if(m - i - 1 == 0){
            if(max_val >= n)
                ans = min(ans, 1LL << i);
            break;
        }
        ll X = (n - max_val - 1) / (m - i - 1) + 1;
        // cerr << max_val << " " << X << '\n';
        if(X <= max_val){
            ans = min(ans, max(X, 1LL << i));
        }
    }
    cout << ans << '\n';
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

## G

记录每种质因子，最长和次长的长度以及颜色，只需要记两种颜色就行。然后对于一个数字，一定是算每一个质因子的总的长度。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
#define cln cerr << "LINE: " << __LINE__ << " "
constexpr int N = int(5e6);
// bitset<N+1>is;
int minp[N + 1];
// vector<int>primes;
struct node{
    int fir_len, fir_col, sec_len, sec_col;
    node(int val = 0){fir_len = fir_col = sec_len = sec_col = val;}
};
node info[N + 1];
// vector<vector<int>>f(N + 1);

void solve()
{
    int n;
    cin >> n;
    vector<int>w(n + 1), c(n + 1);
    for(int i = 1; i <= n; i++)
        cin >> w[i];
    for(int i = 1; i <= n; i++)
        cin >> c[i];
    int ans = 0;
    auto work = [&](int x,int idx){
        /*
        需要记录的是，相同的质因子，最长的长度和次长的长度对应的颜色
        这两个一定颜色不同，颜色相同肯定是一样的长度
        */
        int cur = 0;
        vector<int> p;
        while(x != 1){
            int prime = minp[x];
            while(x % prime == 0)
                x /= prime;
            // 咋搞来着，记最长的颜色和长度，次长的颜色和长度
            if(c[idx] == info[prime].fir_col) cur = max(cur, info[prime].sec_len);
            else cur = max(cur, info[prime].fir_len);
            p.push_back(prime);
        }
        ans = max(ans, ++cur);
        for(auto prime : p){
            if(info[prime].fir_col == c[idx])
                info[prime].fir_len = max(info[prime].fir_len, cur);
            else if(cur > info[prime].sec_len){
                info[prime].sec_col = c[idx];
                info[prime].sec_len = cur;
            }
            if(info[prime].fir_len < info[prime].sec_len){
                swap(info[prime].fir_col, info[prime].sec_col);
                swap(info[prime].fir_len, info[prime].sec_len);
            }
        }
    };
    for(int i = 1; i <= n; i++)
        work(w[i], i);
    cout << ans << '\n';
}
int main()
{
    // freopen("2.in", "r", stdin);
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    for(int i = 2; i <= N; i++){
        if(minp[i]) continue;
        minp[i] = i;
        if((ll)i * i > N) continue;
        for(int j = i * i; j <= N; j += i)
            minp[j] = i;
    }
    // for(int i = 1;i <=35;i++)
    //     cln << minp[i] << '\n';
    // cerr << primes.back() << '\n';
    // cerr << primes.size() << '\n';
    int T = 1;
    // cin >> T;
    while(T--)
        solve();
    return 0;
}
```