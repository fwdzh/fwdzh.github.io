# 第十三届陕西省国际大学生程序设计竞赛 - 正式赛

> 2025-05-13

gym: https://codeforces.com/gym/105891

[![pEjewy4.png](https://s21.ax1x.com/2025/05/14/pEjewy4.png)](https://imgse.com/i/pEjewy4)

打挺差的一集，VP只AC了四题。有一题卡很简单的地方了。虽然只VP三小时。回寝室又看了两小时。

## A

显然每个颜色单独处理，然后就是看这次操作和上次操作隔着多少个距离，考虑是把中间的全部涂色还是开一次新的操作，哪个少选哪个就行。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
 
void solve()
{
    int n;
    cin >> n;
    vector<int> c(n + 1), w(n + 1);
    vector<vector<int>> g(n + 1, vector<int>());
    for(int i = 1; i <= n; i++){
        cin >> c[i];
        g[c[i]].push_back(i);
    }
    for(int i = 1; i <= n; i++)
        cin >> w[i];
    for(int i = 1; i <= n; i++){
        // i = 2;
        g[i].push_back(n + 1);
        int res = 0, lst = -1, idx = 0;
        for(int j = 0; j < g[i].size(); j++){
            if(idx != g[i][j] - 1){
                if(lst == -1){
                    res += w[i] + (g[i][j] - idx - 1);
                }else{
                    res += min(w[i] + g[i][j] - idx - 1, g[i][j] - lst - 1);
                }
                lst = g[i][j] - 1;
            }
            idx = g[i][j];
            // cerr << idx <<" " << lst << " " << res << '\n';
        }
        cout << res << " \n" [i == n];
        // break;
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

## C

一直把 $b$ 除 $gcd(a, b)$ 直到 $gcd(a, b) = 1$，因为这个东西你不除掉的话，$a$ 和 $b$ 一定不互质，而且除了之后，一定是 $b$ 的因子。

```cpp
/*
gcd(a, b) = g
gcd(a / g, b / g) = 1

16 18

32 48
*/
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll a, b;
    cin >> a >> b;
    if(b == 1)
        cout << "-1\n";
    else if(a == 1)
        cout << b << '\n'; 
    else{
        ll c = b;
        for(;c != 1;){
            ll g = gcd(a, c);
            if(g == 1) break;
            c /= g;
        }
        if(c == 1) c = -1;
        cout << c << '\n';
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

## G

很简单，证明简单，就是首先，$a_1$ 和 $a_n$ 一定是删不掉的，中间的数字最多只能留下两个，最大值或者最小值。且若 $a_1$ 或 $a_n$ 是最大值，则最大值也可以被删，若 $a_1$ 或 $a_n$ 是最小值，则最小值也可以被删。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
 
void solve()
{
    int n;
    cin >> n;
    vector<int> a(n + 1);
    for(int i = 1; i <= n; i++)
        cin >> a[i];
    if(n == 1){
        cout << "1\n";
        return;
    }
    int mx = *max_element(a.begin() + 1, a.end());
    int mn = *min_element(a.begin() + 1, a.end());
    if(a[1] < a[n]) swap(a[1], a[n]);
    if(a[1] == mx && a[n] == mn) cout << "2\n";
    else if(a[1] == mx || a[n] == mn) cout << "3\n";
    else cout << "4\n";
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

## J

由于四个字符都不同，只需要找到多的然后直接算就行。先凑长度长的。那我们就找能凑成 lose 的子序列的长度和数量就行，且不能重复，就先找长的就行。

糖丸了的地方是，长度为 $3$ 的有四种，我们当时只写了三种，四个选三个显然是四种选法。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
 
void solve()
{
    int k;
    cin >> k;
 
    string s;
    cin >> s;
    int n = s.size();
 
    vector<bool> vis(n);
    int cnt[5] {0, 0, 0, 0, 0 };
 
    for (int i = 0; i + 3 < n; i++) {
        if (vis[i] || vis[i + 1] || vis[i + 2] || vis[i + 3])
            continue;
 
        if (s.substr(i, 4) == "lose") {
            cnt[4]++;
 
            vis[i] =
            vis[i + 1] = 
            vis[i + 2] = 
            vis[i + 3] = true;
        }
    }
 
    // lose
    for (int i = 0; i + 2 < n; i++) {
 
        if (vis[i] || vis[i + 1] || vis[i + 2])
            continue;
 
        string t = s.substr(i, 3);
 
        if (t == "los" || t == "ose" || t == "lse" || t == "loe") {
            cnt[3]++;
 
            vis[i] = 
            vis[i + 1] = 
            vis[i + 2] = true;
        }
    }
 
    // lose
    for (int i = 0; i + 1 < n; i++) {
 
        if (vis[i] || vis[i + 1])
            continue;
 
        string t = s.substr(i, 2);
 
        if (t == "lo" || t == "ls" || t == "le" || t == "os" || t == "oe" || t == "se") {
            cnt[2]++;
 
            vis[i] = 
            vis[i + 1] = true;
        }
    }
 
    for (int i = 0; i < n; i++) {
 
        if (vis[i])
            continue;
 
        if (s[i] == 'l' || s[i] == 'o' || s[i] == 's' || s[i] == 'e') {
            cnt[1]++;
 
            vis[i] = true;
        }
    }
 
    // cout << cnt[4] <<" " << cnt[3] <<" " <<cnt[2] <<" " << cnt[1] << '\n';
    int ans = cnt[4];
 
    for (int i = 3; i >= 1; i--) {
        if (k >= cnt[i] * (4 - i)) {
            k -= cnt[i] * (4 - i);
            ans += cnt[i];
        } else {
            ans += k / (4 - i);
            k %= (4 - i);
            // break;
        }
    }
    ans += k / 4;
    cout << ans << '\n';
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    // cin >> T;
    while (T--)
        solve();
    return 0;
}
```

## K

挺简单，稍微讨论下就行。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll n, m, x, y;
    cin >> n >> m >> x >> y;
    /*
    tangwanle
    现在才发现 无私的牛希望所有牛的草的总和最多
    本以为是他希望自己的同类得到的总和更多

    唉唉，太无私了
    但是这样是不是简单点来着

    如果自私牛全去 B, 那最好
    无私的牛最多派一个人去 A

    否则他可能得逼着大家去 B
    当然这些会和人数有关

    无私的牛肯定希望去 A 的牛会尽量少
    */
    //首先就看如果无私的都不去 A, 那么答案就是
    ll ans = 0;
    if(x > y){
        if(m)
            ans = max(ans, x + y * n);
        else if(n)
            ans = max(ans , x + (n - 1) * y);
        // 自私的全去 A, 无私的试试能不能让他们都不去 A
        
        // x / (1 + cnt) <= y
        // x <= y * cnt
        // cnt >= (x + y -1) / y, 它们才不会去
        if(y){
            int cnt = (x + y - 1) / y - 1;
            cnt = max(cnt, 1);
            if(n >= cnt)
                ans = max(ans, x + (m + n - cnt) * y);
        }
    }
    else{
        if(n)
            ans = max(ans, x + (m + n - 1) * y);
        ans = max(ans, (m + n) * y);
    }
    cout << ans << '\n';
}
int main()
{
    // freopen("1.in", "r", stdin);
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    cin >> T;
    while (T--)
        solve();
    return 0;
}
```

## L

签到题，随便选。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
 
void solve()
{
    int n;
    cin >> n;
    ll ans = 0;
        for(int i = 1; i < n; i++){
            ans += 3 + (i - 1) * 2 * (n + 1);
        }
    ans += n * n + (n * n - n + 1);
    
    cout << ans << '\n';
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