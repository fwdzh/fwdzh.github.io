# 2024 CCPC 全国邀请赛（山东）暨山东省大学生程序设计竞赛

> 2025-03-16
>
> 7题 罚时1247 银

比赛链接: https://codeforces.com/gym/105385

榜单连接: https://board.xcpcio.com/provincial-contest%2F2024%2Fshandong?group=official

AC顺序: I A F K C J D

K是构造的那个，我一直没想出来，学弟想出来了，可以的。

D是最后瞎搞瞎交了，然后真过了，思路是对的（）。

然后其他题目基本都是模拟吧，其实有的还是有一点难度的。算是最近打得最好的一场了，不管怎么说，该写出来的题都出来了。虽然吃了很多发罚时就是了。。还是太急了一点。

## A

就是一个比较基础的二分。。但是你check的时候和可能会超过 `long long` ，这个故事告诉我们，check的时候要养成及时 `return` 的好习惯。这个其实出现的次数挺多的，最好注意一下。

```cpp
using ll = long long;

void solve()
{
    int n, k;
    cin >> n >> k;
    vector<int> t(n + 1), l(n + 1), w(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> t[i] >> l[i] >> w[i];
    ll lo = 0, hi = 4e18 + 1;
    auto check = [&](ll x)
    {
        ll res = 0;
        for (int i = 1; i <= n; i++)
        {
            ll y = 1LL * t[i] * l[i] + w[i];
            res += x / y * l[i] + min(1LL * l[i], (x % y) / t[i]);
            if (res >= k)
                return true;
        }
        // cerr<<res<<'\n';
        return res >= k;
    };
    while (lo < hi - 1)
    {
        ll mid = (lo + hi) >> 1;
        if (check(mid))
            hi = mid;
        else
            lo = mid;
    }
    // cerr<<check(10)<<'\n';
    cout << hi << '\n';
}
```

## C

少有的一次AC的题。。其实挺简单。

只用考虑左端点在自己前面的和自己相交的线段，自己的颜色只要不和它们一样就好了。

```cpp
using ll = long long;

constexpr int mod = 998244353;

void solve()
{
    int n, k;
    cin >> n >> k;
    vector<pair<int, int>> seg(n);
    for (int i = 0; i < n; i++)
        cin >> seg[i].first >> seg[i].second;
    sort(seg.begin(), seg.end());
    priority_queue<int, vector<int>, greater<>> pq;
    int cnt = 0;
    ll res = 1;
    for (int i = 0; i < n; i++)
    {
        while (!pq.empty() && pq.top() < seg[i].first)
        {
            pq.pop();
            cnt--;
        }
        if (k - cnt > 0)
        {
            // cerr << cnt << '\n';

            res = res * (k - cnt) % mod;
            pq.push(seg[i].second);
            cnt++;
        }
        else
        {
            res = 0;
            break;
        }
    }
    cout << res << '\n';
}
```

## D

刚开始想法是，最初可能可以很多次把钱花光去赚钱，那我们先把这个情况给处理完，然后只能花一部分的钱了因为时间不够，然后这一步是可以二分的。

最开始就是直接模拟第一步的操作，但是吃了几发 TLE ，本来感觉这个操作不会很多次，错误的感觉了次数很少。。

但是其实这个熟练可能和 `t` 会是一个级别的。。。

然后就想到了，可能是非常多次都是能买的数量是一样的，这就会浪费非常多的时间。

所以如果这一次之后，可以买的数量没有增加，我们可以直接跳到下一个 $\lfloor \frac{m}{p} \rfloor +1$ 。因为中间很多次买的数量是一样的，也就是花的时间和钱是一样的，可以直接跳过了。

这样咱们每次加的都是不同的数量，买一个最少需要 $2$ 时间 ， 所以 $2(1 + 2 + ... + k)\le t$ ，所以循环次数最多 $\sqrt t$ 次。

然后就直接算答案就行，其实并不需要二分了。。。你看我那个二分，直接写个除法就好了的吧。。。

```cpp
using ll = long long;
using pii = pair<int, int>;

void solve()
{
    ll p, a, b, q, c, d, m, t;
    cin >> p >> a >> b >> q >> c >> d >> m >> t;

    /*
    (m/p)*(a+b)+c+d <= t

    */
    for (int i = 1;; i++)
    {

        ll x = m / p;
        if (!x)
            break;
        __int128 cost = a * x + b + c * x + d;
        if (cost <= t)
        {
            // cerr<<t<<'\n';
            t -= cost;
            m = q * x + (m % p);
        }
        else
            break;
        ll z = t / ((a + c) * x + b + d); // 最多还能操作的次数

        ll y = (x + 1) * p;
        if (m < y)
        {
            if (m + z * (q - p) * x < y)
            {
                m += z * x * (q - p);
                t %= ((a + c) * x + b + d);
                break;
            }
            else
            {
                ll zz = (y - m) / ((q - p) * x);
                m += zz * (q - p) * x;
                t -= zz * ((a + c) * x + b + d);
            }
        }
    }
    // cerr << "m t: " << m << " " << t << '\n';
    auto check = [&](ll x)
    {
        return (__int128)a * x + b + c * x + d <= t;
    };
    ll lo = 0, hi = m / p + 1;
    while (lo < hi - 1)
    {
        ll mid = (lo + hi) >> 1;
        if (check(mid))
            lo = mid;
        else
            hi = mid;
    }
    m += (q - p) * lo;
    cout << m << '\n';
}
```

## F

从 $k=n$ 开始考虑。我们如果要算 $n-1$ 的情况，就是把某两个相邻的数字合并到一起。

那么这个贡献是多少呢？

我们只考虑向后合并的，比如把 $a_i$ 和 $a_{i+1}$ 合并到一起。那么后面的所有数字的下标都会 $-1$ ，而 $a_i$ 自己，本质上它的贡献是不变的。所以对于每一个 $i$ ，把它向后合并，产生的贡献会是 $-suf_{i+1}$ ，所以我们只需要每次找最小的后缀，那么新的值就是上一个的减去这个后缀。

```cpp
using ll = long long;
using pll = pair<long long, long long>;

void solve()
{
    int n;
    cin >> n;
    vector<ll> ans;
    vector<int> a(n + 1);
    ll now = 0;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        now += 1LL * a[i] * i;
    }
    // ans[n] = now;
    ans.push_back(now);
    ll suf = a[n];
    set<pll> st1, st2;
    st2.insert({1, a[1]});
    st2.insert({n, a[n]});
    if (n > 1)
        st1.insert({suf, n});
    for (int i = n - 1; i >= 2; i--)
    {
        suf += a[i];
        st1.insert({suf, i});
        st2.insert({i, a[i]});
    }
    while (!st1.empty())
    {
        auto [val, i] = *st1.begin();
        st1.erase(st1.begin());
        auto it = st2.lower_bound({i, 0});
        auto [j1, x1] = *it;
        auto [j2, x2] = *prev(it);
        now -= val;
        ans.push_back(now);
        st2.erase({j1, x1});
        st2.erase({j2, x2});
        st2.insert({j2, x1 + x2});
    }
    reverse(ans.begin(), ans.end());
    for (auto x : ans)
        cout << x << " ";
    cout << '\n';
}
```

## I

只有出现两个相同字符相邻的情况，或者原本就是首尾相同，才是可以的。

```cpp
void solve()
{
    string s;
    cin>>s;
    if(s.front()==s.back()){
        cout<<"0\n";
        return;
    }
    for(int i=0;i+1<s.size();i++){
        if(s[i]==s[i+1]){
            cout<<i+1<<'\n';
            return;
        }
    }
    cout<<"-1\n";
}
```

## J

其实也不难的，忘记 `long long` WA 了一次，当然第一次是因为写了一个错的做法。

我们可以换一个想法啊，就是我们先把 $n$ 个不同颜色的点连成一颗权值最小的树，然后再把剩下的所有点，直接全部连权值最小的边。因为经过第一步操作之后，所有点都在树上了，剩下的直接哪个小连哪个就行了。

由于每个颜色的点一定不可能只连自己身上的，一定会有连到别的点上的，所以我们这样做就一定是对的。

```cpp
using ll = long long;
using pii = pair<int, int>;

void solve()
{
    int n;
    cin >> n;
    vector<int> a(n + 1);
    vector<vector<int>> b(n + 1, vector<int>(n + 1));
    ll sum = 0;
    for (int i = 1; i <= n; i++)
        cin >> a[i], a[i]--;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> b[i][j];
    set<int> vis;
    priority_queue<pii, vector<pii>, greater<>> pq;
    // 先每种颜色都只用一个点 再慢慢加上去
    vis.insert(1);
    for (int i = 2; i <= n; i++)
        pq.push({b[1][i], i});
    while (!pq.empty())
    {
        auto [val, i] = pq.top();
        pq.pop();
        if (vis.count(i))
            continue;
        vis.insert(i);
        sum += val;
        for (int j = 1; j <= n; j++)
        {
            if (vis.count(j))
                continue;
            pq.push({b[i][j], j});
        }
    }
    // cerr << sum << '\n';
    for(int i=1;i<=n;i++){
        sum+=1LL*a[i]*(*min_element(b[i].begin()+1,b[i].end()));
    }
    cout<<sum<<'\n';
}
```

## K

构造题。。

方法其实也是挺多的。

题解的是前 n-2 行 ，每行都用 1 个不同的数字。

然后最后两行，前 n-2 列，每列 2 个一样的数字，最后四个数字用不一样的数字。

```
1111
2222
3456
3478
```

好牛。。。

我们的是四个角放不同的，然后第一行剩余的位置放不同的数字，最后一行和它相同，然后剩余的每行填一个不同的数字。。

也是非常的对。

这题 [学弟](https://codeforces.com/profile/Dragon66677750) 拿了 `mvp` 😎😎😎。

```
1562
7777
8888
3564
```

```cpp
using ll = long long;

void solve()
{
    int n;
    cin>>n;
    vector<vector<int>>a(n+1,vector<int>(n+1));
    a[1][1]=1,a[1][n]=2,a[n][1]=3,a[n][n]=4;
    int tot=5;
    for(int i=2;i<n;i++){
        a[1][i]=a[n][i]=tot++;
    }
    for(int i=2;i<n;i++){
        for(int j=1;j<=n;j++)
            a[i][j]=tot;
        tot++;
    }
    cout<<"Yes\n";
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            cout<<a[i][j]<<" \n"[j==n];
}
```