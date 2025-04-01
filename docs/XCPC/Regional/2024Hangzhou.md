# 第 49 届 ICPC 国际大学生程序设计竞赛区域赛杭州站

> 2025-03-29

比赛链接: https://codeforces.com/gym/105657

榜单链接: https://board.xcpcio.com/icpc%2F49th%2Fhangzhou?group=official

赛时录屏：https://www.bilibili.com/video/BV14HZAYBE2D/?share_source=copy_web&vd_source=9bd61884350b59581dea6fe19fc6f004

[![pEyK7CQ.png](https://s21.ax1x.com/2025/04/01/pEyK7CQ.png)](https://imgse.com/i/pEyK7CQ)

这场打得不算很好，我有一些问题。。H 远比 M 好写，但我前面看人数差得不是很多，干脆去看 M 了，最后发现一直 WA，最后一小时没办法只能去看 H ，感觉很简单。但是也一直 WA，赛后看题解发现也确实是缺特判没想到。离铜差20名。

## A

签到，但是 WA 两次。。。然后稍微看了下发现要用下并查集。

``` cpp
void ChatGptDeepSeek()
{
    string s1, s2, s3;
    cin >> s1 >> s2 >> s3;
    if (s1.size() != s2.size())
    {
        cout << "NO\n";
        return;
    }
    if (s3.size() != s1.size())
    {
        cout << "YES\n";
        return;
    }
    vector<int> f(27);
    iota(f.begin(), f.end(), 0);
    auto find = [&](auto &&self, int x) -> int
    {
        return f[x] == x ? x : f[x] = self(self, f[x]);
    };
    for (int i = 0; i < s1.size(); i++)
    {
        int x = s1[i] - 'a' + 1;
        int y = s2[i] - 'a' + 1;
        f[find(find, x)] = find(find, y);
    }
    for (int i = 0; i < s3.size(); i++)
    {
        int x = s1[i] - 'a' + 1;
        int y = s3[i] - 'a' + 1;
        if (find(find, x) != find(find, y))
        {
            cout << "YES\n";
            return;
        }
    }
    cout << "NO\n";
}
```

## E

如果有比 $f$ 低的楼层，我们可以免费过去。但如果那个楼层要去的比 $f$ 低，我们过去就不划算。

若比 $f$ 低的楼层里，有人需要去比 $f$ 更高的楼层，那么我们就相当于可以免费让 $f$ 变得更高，这显然更好。

如果 $f$ 不能变得更高，若有人在比 $f$ 高的楼层，那 $f$ 肯定去下一个比 $f$ 大的 $l$ 的 $r$ 那里，否则就顺着 $l$ 从大到小走完。

优先队列维护下就行。

``` cpp
using pii = pair<int, int>;
#define fi first
#define se second
void ChatGptDeepSeek()
{
    int n, f;
    cin >> n >> f;
    priority_queue<pii, vector<pii>, greater<>> pq;
    priority_queue<pii> low, low1;
    vector<int> l(n + 1), r(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> l[i] >> r[i];
        pq.push({l[i], i});
        // 按 [l,r] 排序
    }
    int lst = f;
    vector<int> ans;
    while (pq.size() || low.size())
    {
        while (!pq.empty() && pq.top().fi <= f)
        {
            auto [left, i] = pq.top();
            pq.pop();
            low.push({r[i], i});
        }
        if (!low.empty() && low.top().first > f)
        {
            auto [right, i] = low.top();
            low.pop();
            ans.push_back(i);
            f = right;
        }
        else if (!pq.empty())
        {
            auto [left, i] = pq.top();
            pq.pop();
            f = r[i];
            ans.push_back(i);
        }
        while (!low.empty())
        {
            auto [right, i] = low.top();
            low.pop();
            low1.push({l[i], i});
        }
    }
    while (!low1.empty())
    {
        auto [left, i] = low1.top();
        low1.pop();
        ans.push_back(i);
    }
    long long sum = 0;
    for (auto i : ans)
    {
        sum += r[i] - l[i] + max(0, l[i] - lst);
        lst = r[i];
    }
    cout << sum << '\n';
    for (auto i : ans)
        cout << i << ' ';
    cout << '\n';
}
```

## H

我单单想到了所有链的父节点都可以是 $root$ ， $root$ 必须是最长的链。但却没考虑到若有多条最长链，其实也是会有合法情况的。因为重的点，考虑的是子树大小，而不是链的长度。

所以若有多条最长的链，以一条最长链的起点为根，试试能不能把最短链放到那条最长链的第二个点上。

``` cpp
void ChatGptDeepSeek()
{
    int n, k;
    cin >> n >> k;
    vector<pii> p(k);

    for (int i = 0; i < k; i++)
        cin >> p[i].first >> p[i].second;
    if (n == 1)
    {
        cout << "0\n";
        return;
    }
    vector<int> f(n + 1);
    sort(p.begin(), p.end(), [](pii x, pii y)
         { return x.second - x.first > y.second - y.first; });
    if (p[0].first == p[0].second)
    {
        cout << "IMPOSSIBLE\n";
        return;
    }
    for (int l = p[0].first + 1; l <= p[0].second; l++)
        f[l] = l - 1;

    int max_len = p[0].second - p[0].first + 1, root = p[0].first;
    if (k > 1 && p[1].second - p[1].first+1 == max_len)
    {
        auto [l, r] = p.back();
        if (r - l + 1 >= max_len - 1)
        // if (max_len - (r - l + 1) <= 1)
        {
            cout << "IMPOSSIBLE\n";
            return;
        }
        f[l] = root + 1;
        for (int i = l + 1; i <= r; i++)
        {
            if (f[i] || i == root)
            {
                cout << "IMPOSSIBLE\n";
                return;
            }
            f[i] = i - 1;
        }
        k--;
    }
    long long sum = max_len;
    for (int i = 1; i < k; i++)
    {
        auto [l, r] = p[i];
        sum += r - l + 1;

        // if (r - l + 1 == max_len)
        // {
        //     cout << "IMPOSSIBLE\n";
        //     return;
        // }
        if (f[l] || l == root)
        {
            cout << "IMPOSSIBLE\n";
            return;
        }
        f[l] = root;

        for (int j = l + 1; j <= r; j++)
        {
            if (f[j] || j == root)
            {
                cout << "IMPOSSIBLE\n";
                return;
            }
            f[j] = j - 1;
        }
    }

    for (int i = 1; i <= n; i++)
    {
        if (f[i] == 0 && (i != root))
        {
            cout << "IMPOSSIBLE\n";
            return;
            // f[i] = root;
        }
    }
    for (int i = 1; i <= n; i++)
        cout << f[i] << " \n"[i == n];
}
```

## K

也是没注意 $k$ 可能会大于前面空出来的位置于是 WA 了一发。

``` cpp
void ChatGptDeepSeek()
{
    int n, m, k;
    cin >> n >> m >> k;
    vector<int> p(n * m + 1);
    for (int i = 1; i <= n * m; i++)
        cin >> p[i];
    if (k >= m)
    {
        cout << m << '\n';
        return;
    }
    vector<vector<int>> r(n + 1, vector<int>());
    for (int i = 1; i <= n * m; i++)
    {
        r[(p[i] + m - 1) / m].push_back(i);
    }
    int ans = n * m;
    for (int i = 1; i <= n; i++)
    {
        /* k m-k */
        int idx = r[i][m - k - 1];
        int rest = idx - (m - k);
        int res = (k > rest ? idx + (k - rest) : idx);
        ans = min(ans, res);
    }
    cout << ans << '\n';
}
```

## M

我们想的是，能不能只考虑长度为2的区间，，因为除的那个性质是可以传递的。。然后也是推出来了两个数字的话，小的那个加了之后必须是它们差值的因子。但是所有区间都要这样考虑。要用笛卡尔树，这个我还没学过，之后学了再回来看看这题。

这个题，首先每个区间的最小值 $a_i+k$ 一定要是区间内所有数字最大公因子的一个因子。设 $g=gcd(a_2-a_1,a_3-a_2,...,a_i-a_{i-1})$ , 那么每个区间的最小值 $(a_m+x)\mid g$ 。

直接枚举 $g$ 的因子，然后检查是否合法。可以建笛卡尔树来检查是否合法，每个节点它的左右孩子节点一定要可以被它整除。于是每次检查的时间复杂度大约是 $O(n)$ 。因子的个数是会远小于 $\sqrt{V}$ 的。

``` cpp
void ChatGptDeepSeek()
{
    int n, k;
    cin >> n >> k;
    vector<int> a(n + 1);
    int g = 0, mn = 1e9;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        mn = min(mn, a[i]);
    }
    for (int i = 2; i <= n; i++)
        g = __gcd(g, abs(a[i] - a[i - 1]));
    // cerr << g << '\n';
    if (!g)
    {
        cout << k << " " << 1LL * k * (k + 1) / 2 << '\n';
        return;
    }
    vector<int> b(n + 1), l(n + 1), r(n + 1), d;
    for (int i = 1; i * i <= g; i++)
    {
        if (g % i == 0)
        {
            int dd = i - mn;
            if (dd >= 1 && dd <= k)
                d.push_back(dd);
            if (i * i != g)
            {
                dd = g / i - mn;
                if (dd >= 1 && dd <= k)
                    d.push_back(dd);
            }
        }
    }
    int ans = 0;
    long long sum = 0;

    auto build = [&]()
    {
        vector<int> stk;
        for (int i = 1; i <= n; i++)
        {
            while (!stk.empty() && b[stk.back()] > b[i])
                l[i] = stk.back(), stk.pop_back();
            if (!stk.empty())
                r[stk.back()] = i;
            stk.push_back(i);
        }
        mn = stk[0];
    };
    auto dfs = [&](auto &&self, int i) -> bool
    {
        if (l[i])
        {
            if (b[l[i]] % b[i])
                return false;
            if (!self(self, l[i]))
                return false;
        }
        if (r[i])
        {
            if (b[r[i]] % b[i])
                return false;
            if (!self(self, r[i]))
                return false;
        }
        return true;
    };
    auto check = [&](int x)
    {
        for (int i = 1; i <= n; i++)
            b[i] = a[i] + x, l[i] = r[i] = 0;
        build();
        return dfs(dfs, mn);
    };

    for (auto x : d)
    {
        // cerr << x << "\n";
        if (check(x))
            ans++, sum += x;
    }
    cout << ans << " " << sum << '\n';
}
```