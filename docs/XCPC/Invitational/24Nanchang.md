# 2025年icpc全国邀请赛（南昌）暨2025年（icpc）江西省大学生程序设计竞赛

> 今年打的三场邀请赛里，唯一拿到奖牌的一场，也是上半年能打的最后一场比赛。非常开心，但此刻不知道说什么。
>
> 赶紧把题目补了吧，有点唐了，这个G这么简单。

I 题看了题解但现在不想写，😭，下次加上。

ok已经加了。。。现在是要睡觉的时间，其余部分是上午上课写的。。。赶紧把这套题结束了，不能一直拖着。

## A

签到，我本来真打算直接输出 `a * b * c * d` 的，但是多看了一会。

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    cout << (a + b + c) * d << '\n';
    return 0;
}
```

## D

对于每一个坐标，我们可以分开考虑。

比如如果我们选取的平面是 $x = x_0$，那么答案就为 $x_1 \le x0$ 且 $x_2 \ge x_0$ 的线段的数量，可以通过差分很容易求出来。

```cpp
#include<bits/stdc++.h>
using namespace std;
using pii = pair<int, int>;

void solve() {
    int n, a, b, c;
    cin >> n >> a >> b >> c;
    vector<vector<int>> vec1(3, vector<int>(n)), vec2(3, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < 3; j++)
            cin >> vec1[j][i];
        for (int j = 0; j < 3; j++)
            cin >> vec2[j][i];
    }
    int ans = 0;
    auto work = [&](vector<int> a, vector<int> b) {
        /* 离散化一下
         * 对于一个 x，我们需要找 a <= x && b >= x 的 pair 的数量
         * 差分确实很对啊。。。赛时写得是树状数组调好久 还好队友帮我造了很多数据
         */
        {
            vector<pii> tmp(2 * n);
            for (int i = 0; i < n; i++) {
                tmp[i].first = b[i];
                tmp[i].second = i;
            }
            for (int i = 0; i < n; i++) {
                tmp[i + n].first = a[i];
                tmp[i + n].second = i + n;
            }
            ranges::sort(tmp);
            int tot = 1, lst = tmp[0].first;
            tmp[0].first = 1;
            for (int i = 1; i < 2 * n; i++) {
                if (tmp[i].first != lst) {
                    ++tot;
                    lst = tmp[i].first;
                }
                tmp[i].first = tot;
            }
            ranges::sort(tmp, [](pii x, pii y) {
                return x.second < y.second;
            });
            for (int i = 0; i < n; i++) {
                b[i] = tmp[i].first;
                // cerr << b[i] << ' ';
            }
            for (int i = 0; i < n; i++)
                a[i] = tmp[i + n].first;

        }
        vector<int> d(2 * n + 10);
        for (int i = 0; i < n; i++) {
            // cerr << a[i] << ' ' << b[i] << " \n";
            if (a[i] > b[i]) swap(a[i], b[i]);
            d[a[i]] += 1, d[b[i] + 1] -= 1;
        }
        int now = 0;
        for (int i = 1; i <= 2 * n; i++) {
            now += d[i];
            ans = max(ans, now);
        }
    };
    work(vec1[0], vec2[0]);
    work(vec1[1], vec2[1]);
    work(vec1[2], vec2[2]);
    cout << ans << '\n';
}
int main() {
    cout << fixed << setprecision(12);
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    // cin >> T;
    while(T--)
        solve();
    return 0;
}
```

## E

我们需要找的是 $[l, r]$ 中有多少个字串 $s$ 重新排列后可以被 $k$ 个相同字符串 $t$ 组成，那么相当于是有多少个 $s$ 每种字符的数量都为 $k$ 的倍数。

那么我们就可以转换成前缀和问题，若两个前缀的每种字符数量模 $k$ 之后都相同，那么可以产生一个满足条件的字串。

所以就可以用莫队了，确实是很板的题目，但是哈希我不咋会。。。搞了半天。当然赛时我是没看过这题的，看了也不会。

给一道一样的题，其实都是莫队模板题，[P4462 [CQOI2018] 异或序列](https://www.luogu.com.cn/problem/P4462)。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
using pii = pair<int, int>;
using ll = long long;
using ull = unsigned long long;

struct node {
    int l, r, idx;
};

mt19937_64 rng(time(NULL));
ll rand_integer(ll l, ll r) {
    uniform_int_distribution<ll> dis(l, r);
    return dis(rng);
}

void solve() {
    int n, k, q;
    cin >> n >> k >> q;
    string s;
    cin >> s;
    vector<int> pos(n + 1);
    
    vector<ull> val(26), pre(n + 1);
    for(int i = 0; i < 26; i++)
        val[i] = rng();
    vector<int> cnt(26);

    for(int i = 1; i <= n; i++){
        int x = s[i - 1] - 'a';
        cnt[x] = (cnt[x] + 1) % k;
        for(int j = 0; j < 26; j++)
            pre[i] += val[j] * cnt[j];
    }
    {
        vector<pair<ull, ull>> tmp(n + 1);
        for(int i = 0; i <= n; i++)
            tmp[i] = {pre[i], i};
        ranges::sort(tmp);
        int tot = 1;
        ull lst = tmp[0].first;
        tmp[0].first = 1;
        for(int i = 1; i <= n; i++){
            if(tmp[i].first != lst){
                ++tot;
                lst = tmp[i].first;
            }
            tmp[i].first = tot;
        }
        ranges::sort(tmp, [](pii x, pii y){return x.second < y.second;});
        for(int i = 0; i <= n; i++) pre[i] = tmp[i].first;
    }
    int siz = sqrt(n);
    for (int i = 1; i <= n; i++) {
        pos[i] = i / siz;
    }

    vector<node> ask(q);
    for (int i = 0; i < q; i++) {
        cin >> ask[i].l >> ask[i].r;
        ask[i].l--;
        ask[i].idx = i;
    }

    ranges::sort(ask, [&](node x, node y) {
        return (pos[x.l] == pos[y.l]) ? (x.r < y.r) : (pos[x.l] < pos[y.l]);
    });

    vector<int> res(q), mp(n + 10);
    ll ans = 0;
    int L = 0, R = -1;

    auto add = [&](int i) {
        ans += mp[pre[i]]++;
    };

    auto del = [&](int i) {
        ans -= --mp[pre[i]];
    };

    for (auto [l, r, idx] : ask) {
        while (L < l) del(L++);
        while (L > l) add(--L);
        while (R < r) add(++R);
        while (R > r) del(R--);
        res[idx] = ans;
    }

    for (int i = 0; i < q; i++) {
        cout << res[i] << '\n';
    }
}

int32_t main() {
    // freopen("1.in", "r", stdin);
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    while(T--)
        solve();
    return 0;
}
```

## F

队友 [@tanxf](https://codeforces.com/profile/tanxf) 给我看出来了，幸好有你。

$r$ 一定取最小，这谁敢这样猜啊。。。虽然难度他们预设的是前期的题，但是这是通过人数第五的题。

还好有好队友，就很爽了。

```cpp
#include<bits/stdc++.h>
using namespace std;

void solve() {
    int n, k;
    cin >> n >> k;
    vector<double> r(n + 1), c(n + 1);
    cin >> r[0] >> c[0];
    double p, L, R;
    cin >> p >> L >> R;
    for (int i = 1; i <= n; i++)
        r[i] = L;
    for (int i = 1; i <= k; i++) {
        int id;
        double v;
        cin >> id >> v;
        r[id] = v;
    }
    double ans = 0;
    for (int i = 1; i <= n; i++) {
        c[i] = p * c[i - 1] + (1 - p) * r[i - 1];
        ans += c[i] - r[i];
    }
    cout << ans << '\n';
}
int main() {
    cout << fixed << setprecision(12);
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

服了，还以为多难呢。。。大家都能想到吧，就是求每个点经过 $x$ 条边的最大边权乘积，但是怎么算呢？就算用 dp 怎么算呢？

其实我脑子里一直考虑的是，“我要从哪开始 dfs 呢？”。。。哈哈哈哈，然后早上稍微想了一下，这不是直接循环就行的。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int, int>;
constexpr ll inf = int(1e9) + 1;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int n, m, q;
    cin >> n >> m >> q;
    vector<vector<pii>> g(n + 1, vector<pii>());
    for(int i = 1; i <= m; i++){
        int u, v, d;
        cin >> u >> v >> d;
        g[u].push_back({v, d});
    }
    // 可能多个重复的边，好吧 这个好像不用管的
    vector<vector<ll>> dp(n + 1, vector<ll>(32, 1));
    for(int edge = 1; edge <= 31; edge++){
        for(int i = 1; i <= n; i++){
            for(auto [v, d] : g[i]){
                dp[i][edge] = max(dp[i][edge], dp[v][edge - 1] * d);
                dp[i][edge] = min(dp[i][edge], inf);
            }
        }
    }
    while(q--){
        int p, x;
        cin >> p >> x;
        for(int edge = 1; ; edge++){
            if(dp[p][edge] > x){
                cout << edge << '\n';
                break;
            }
        }
    }
    return 0;
}
```

## I

看题解的思路弄的，还没仔细想。。。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int, int>;
constexpr int mod = 998244353;

constexpr int N = int(2e5);
ll fac[N + 1], inv[N + 1];

ll ksm(ll a, ll b)
{
    ll res = 1;
    while (b) {
        if (b & 1)
            res = res * a % mod;
        a = a * a % mod, b >>= 1;
    }
    return res;
}
ll C(ll n, ll m) { return fac[n] * inv[m] % mod * inv[n - m] % mod; }

void solve()
{
    int n, k;
    cin >> n >> k;
    string s;
    cin >> s;
    if(count(s.begin(), s.end(), '1') < k){
        cout << "0\n";
        return;
    }
    s = " " + s;
    vector<int> pos(n + 1, 1), pre(n + 1);
    queue<int> q;
    int cnt = 0;
    for (int i = 1, j = 1; i <= n; i++) {
        pre[i] = pre[i - 1] + (s[i] == '1');
        if (s[i] == '1')
            cnt++;
        while (cnt > k)
            if (s[j++] == '1')
                cnt--;
        if (cnt < k)
            pos[i] = 1;
        else
            pos[i] = j;
    }
    vector<ll> dp(n + 1);
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        // cerr << pos[i] << " \n"[i == n];
        dp[i] = dp[i - 1];
        // if (pos[i] == 0)
        //     continue;
        if (s[i] == '1') {
            if (i - pos[i] + 1 == pre[i] - pre[pos[i] - 1])
                continue;
            // 反正都是看中间的 0 的个数，要放两个 1
            dp[i] = (dp[i] + C(i - pos[i], pre[i] - pre[pos[i] - 1])) % mod;
        } else {
            // 中间要放多少个0
            if(pre[i] - pre[pos[i] - 1])
                dp[i] = (dp[i] + C(i - pos[i], pre[i] - pre[pos[i] - 1] - 1)) % mod;
        }
    }
    dp[n] = (dp[n] + mod) % mod;
    cout << dp[n] << '\n';
}
int main()
{
    // freopen("1.in", "r", stdin);
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    fac[0] = 1;
    for (int i = 1; i <= N; i++)
        fac[i] = (ll)fac[i - 1] * i % mod;
    inv[N] = ksm(fac[N], mod - 2);
    for (int i = N - 1; i >= 0; i--)
        inv[i] = (ll)inv[i + 1] * (i + 1) % mod;

    int t;
    cin >> t;
    while (t--)
        solve();
    return 0;
}
```

## K

感觉还是有点难想的。尽管是第二个 ac 的题目。

每个人思路都不一样吧，说说我们的。

首先对于每个点，肯定最多也就操作 $3$ 次，所以最多的操作次数顶多也就是 $3n$ 左右。可以直接枚举进行了多少次操作。

我们想法是假设进行的操作全是修改所有数字，那么操作后也会有 $1$， $2$, $3$，这些数字，那么给会变成 $1$ 的数字进行一次另一种操作并少一次全局操作，那么它肯定会变成 $0$。所以若操作后所有数字的和小于等于操作次数，就可以使得所有数字变成 $0$。

感觉是不是可能有点不太对，只是刚好对了 😘😘😘。不不不，好像没问题，因为你不同操作次数的话，每个数字的种类肯定都不一样，这样肯定是对的。我这种思路应该是没办法 O($1$) 的，也没办法二分，反正次数不多为啥不直接循环呢。

```cpp
//
// Created by ilyha on 25-5-20.
//
#include<bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int n;
    cin>>n;
    int cnt[]{0, 0, 0, 0};
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        cnt[x]++;
    }
    if (cnt[0] == n) {
        cout << "0\n";
        return 0;
    }
    for (int i = 1; ; i++) {
        int tnc[4];
        for (int j = 0; j < 4; j++) {
            tnc[(j + i) % 4] = cnt[j];
        }
        int sum = 0;
        for (int j = 0; j < 4; j++) {
            sum += tnc[j] * j;
        }
        if (sum <= i) {
            cout << i << '\n';
            return 0;
        }
    }
    return 0;
}
```

## M

随便推一下就出来了。

顺便一提，这题贡献了我们本场唯一一次罚时。。好像是我把朝上和朝下搞反了，然后测了挺多样例我们没咋看出来，于是交了，然后想起来了改了过了。

如果能想到第一堆放 $k$ 个，第二堆放 $n - k$ 个，就比较容易推出来了。

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int n, k;
    cin >> n >> k;
    /*
     * 假设前面是 x 个朝下的，k - x 个朝上
     * 后面是 k - x 个朝上的
     */
    cout << string(k, '1') + string(n - k, '4') << '\n';
    return 0;
}
```