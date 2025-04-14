# 第 49 届 ICPC 国际大学生程序设计竞赛区域赛上海站

> 2024-04-14
> 
> 本来以为这场会相对简单，VP起码能拿个牌，然而打铁且距离牌子四十名

比赛链接: https://qoj.ac/contest/1913

榜单链接: https://board.xcpcio.com/icpc%2F49th%2Fshanghai?group=official

VP时只通过了B C I ，最后的时间都在看 G 但是还是没能成功。昨晚又交了两个小时。看了题解加网上搜了一下说要注意负数整除的。。。加了一下过了。

## B

### 题意

给了一串代码，对于一个图进行 dfs ， 问我们最少加几条边才能使得 dfs 时输出的序列可能为给定的排列 $p$ 。因为其实是不确定每次先去连着的哪个点，所以我们只要保证有可能输出 $p$ 。

```pascal
function dfs(u)
    mark u as visited
    output u
    for v in vertices adjacent to u
        if v is not visited, then
            dfs(v)
        Endif
    Endfor
Endfunction

function run_dfs()
    for v in all vertices
        if v is not visited, then
            dfs(v)
        Endif
    Endfor
Endfunction
```

### 思路

我们记录当前回溯到了哪个点，如果这个点周围所有的点都回溯完了，那么就看它的父节点有没有能走的，就一直变成它的祖先节点，直到有可以走的点。若它的祖先节点都走完了，那么后面的点，就不需要连边了。

我们设 $cur$ 为我们当前在的点，初始时为 $p_1$ ，若 $p_1$ 没有连任何点，那么就让 $cur=0$ 。

我们从 $p_2$ 开始遍历 $p$ ，若 $cur=0$ ，则有可能直接走 $p_i$ ，不需要增加边。若 $cur\ne 0$ ，则看 $p_i$ 有没有和当前在的点 $cur$ 连边，若没有，我们必须加边。

因为你当前的那个节点还有子结点，且是深度优先搜索，所以一定会向子结点走，所以你必须加一条边使得下一个走的点是 $p_i$ 。我们直接连 $p_i$ 和 $p_{i-1}$ 就好了。因为上一个走到的点肯定是 $p_{i-1}$ ，连了之后肯定下一个会走 $p_{i}$ ，虽然可能会连 $p_{i-1}$ 的祖先节点也是可以的，但是连 $p_{i-1}$肯定不会更差。

每次操作之后我们就记录每个点 $p_i$ 的父节点是谁，以及更新 $cur$ 为当前的有能走的边的点。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-13
{                      // Time: 15:16:16
    int n, m;
    cin >> n >> m;
    vector<unordered_set<int>> st(n + 1);
    vector<int> cnt(n + 1), f(n + 1);
    for (int i = 1; i <= m; i++)
    {
        int u, v;
        cin >> u >> v;
        st[u].insert(v);
        st[v].insert(u);
    }

    vector<int> p(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cnt[i] = st[i].size();
        cin >> p[i];
    }
    if (m == 0)
    {
        cout << "0\n";
        return;
    }
    // for (int i = 1; i <= n; i++)
    //     cerr << st[i].size() << " \n"[i == n];
    vector<pair<int, int>> ans;
    int cur = p[1];
    vector<bool> vis(n + 1);
    vis[p[1]] = true;
    for (auto v : st[p[1]])
    {
        // st[v].erase(p[1]);
        cnt[v]--;
    }
    if (st[p[1]].empty())
        cur = 0;
    // for (int i = 1; i <= n; i++)
    //     cerr << st[i].size() << " \n"[i == n];
    for (int i = 2; i <= n; i++)
    {
        vis[p[i]] = true;
        // cerr << p[i] << " " << cur << '\n';
        if (cur == 0)
        {
        }
        else if (st[cur].contains(p[i]))
        {
            f[p[i]] = cur;
        }
        else
        {
            f[p[i]] = p[i - 1];
            ans.push_back({p[i - 1], p[i]});
        }
        // for (auto v : st[p[i]])
        // {
        //     // st[v].erase(p[i]);
        //     cnt[v]--;
        // }
        // for (auto v : st[p[i]])
        //     if (vis[v])
        //         st[v].erase(p[i]);
        for (auto it = st[p[i]].begin(); it != st[p[i]].end();)
        {
            if (vis[*it])
            {
                st[*it].erase(p[i]);
                it = st[p[i]].erase(it);
            }
            else
                it++;
        }
        cur = p[i];
        // for (int i = 1; i <= n; i++)
        // {
        //     // cerr << st[i].size() << " \n"[i == n];
        //     cerr << cnt[i] << " \n"[i == n];
        // }
        while (cur && st[cur].empty())
        {
            // cerr<<cur<<" "<<cnt[cur]<<" "<<f[cur]<<'\n';
            cur = f[cur];
        }
        if (cur != p[i])
            f[p[i]] = cur;
        // cerr << "st[p[2]]: ";
        // for (auto x : st[p[2]])
        //     cerr << x << " ";
        // cerr << '\n';
    }
    cout << ans.size() << '\n';
    for (auto [u, v] : ans)
        cout << u << " " << v << '\n';
}
```

注意更新 $cur$ 之后，可以直接把 $p_i$ 的父节点改成 $cur$ , 否则后面层数可能会很多，导致超时。想想当连成的图为一条链时。至于删点，其实没必要，因为每个边最多就遍历两次。

## C

看起来是博弈，但其实很简单，并非博弈吧。

### 题意

Alice 和 Bob 正在玩一个游戏。在黑板上写下 $[l,r]$ 之间的所有数字，有一个特殊的数字 $x$ ，开始时等于 $l$ 。

Alice 和 Bob 轮流从黑板上擦除一个 $x$ 的倍数，在这之后 $x$ 的值会增加 $1$ 。Alice 先进行操作，无法擦除数字的人会输。问都以最佳策略操作的情况下，谁会赢。

### 思路

考虑到对于每一个人来说，他们操作的 $x$ 的奇偶性是固定的，且与另一个人相反。一个偶数的倍数只能是偶数，但是奇数的倍数只能是奇数。

所以对偶数操作的那个人，她是不能使得另一个人可操作的数字变少的；对奇数操作的那个人，可能可以使得一些偶数被删掉，那么就会让偶数变少，自己可能就能赢了。

所以就看奇数偶数的数量以及是否有奇数的偶数倍数就行。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-13
{                      // Time: 15:04:24
    // 2 3 4 5 6
    //
    int l, r;
    cin >> l >> r;
    if (l & 1)
    {
        if (r & 1)
            cout << "Alice\n";
        else
        {
            if (2 * l <= r)
                cout << "Alice\n";
            else
                cout << "Bob\n";
        }
    }
    else
    {
        if (r & 1)
        {
            cout << "Bob\n";
        }
        else
        {
            if ((l + 1) * 2 <= r)
                cout << "Bob\n";
            else
                cout << "Alice\n";
        }
    }
}
```

## G

### 题意

给 $n$ 条红色的线 ， 每条线的方程为 $y=a_ix+b_i$ 和 $n$ 条蓝色的线，每条线的方程为 $x=c_i$ 。现在我们要把红线和蓝线一一配对，使得每一对线的交点的纵坐标的中位数最大。求最大的值是多少。

### 思路

考虑使用二分，斜线只有三种，$a_i>0$ , 则 $x$ 越大，$y$ 会越大; $a_i<0$ ，$x$ 越小，$y$ 会越大。

所以我们要判断一个高度 $H$ 是否可行，可以先算出至少需要 $x$ 为多少，或者 $x$ 至多为多少。那么排序后，每个斜线需要的直线都会是在一个前缀里，或者是在一个后缀里。

需要注意的是，负数整除挺烦的。。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-13
{                      // Time: 18:10:15
    int n;
    cin >> n;
    vector<ll> a(n + 1);
    vector<ll> b(n + 1), c(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    for (int i = 1; i <= n; i++)
        cin >> b[i];
    for (int i = 1; i <= n; i++)
        cin >> c[i];
    sort(c.begin() + 1, c.end());

    auto check = [&](ll H)
    {
        vector<int> p(n + 1), s(n + 1);
        int M = 0;
        for (int i = 1; i <= n; i++)
        {
            if (a[i] > 0)
            {
                // ll need = (H - b[i]) / a[i] + ((H - b[i]) % a[i] != 0);
                ll need = (H - b[i]) / a[i];
                if ((H - b[i]) >= 0 && (H - b[i]) % a[i] != 0)
                    need++;
                // 大于等于3.5的话 大于等于4 没问题
                // 大于等于-3.5的话 大于等于-3就行

                // 小于等于0.5 要改
                // 大于等于-0.5不用改
                int idx = lower_bound(c.begin() + 1, c.end(), need) - c.begin();
                if (idx <= n)
                {
                    s[idx]++;
                    assert(idx >= 1 && idx <= n);
                }
            }
            else if (a[i] == 0)
            {
                if (b[i] >= H)
                {
                    // s[1]++;
                    p[n]++;
                    // M++;
                }
            }
            else
            {
                ll need = (H - b[i]) / a[i];
                // if (need < 0 && (H - b[i]) % a[i] != 0)
                //     need--;
                // ll need = (H - b[i]) / a[i];
                // 小于等于3.5时 小于等于3就行
                // 小于等于-3.5时，小于等-4
                // ax+b>=H
                // x<=(H-b)/a
                // 所以减1 没问题阿

                // 但可能是+0.5 也可能是-0.5
                if (H - b[i] >= 0 && (H - b[i]) % a[i] != 0)
                    need--;
                int idx = upper_bound(c.begin() + 1, c.end(), need) - c.begin() - 1;

                // cerr << i << " " << need << " " << idx << " \n";

                if (idx >= 1)
                {
                    assert(idx >= 1 && idx <= n);

                    p[idx]++;
                }
            }
        }
        // for (int i = 1; i <= n; i++)
        //     cerr << p[i] << " \n"[i == n];
        // for (int i = 1; i <= n; i++)
        //     cerr << s[i] << " \n"[i == n];
        // 1 0 1 0
        for (int i = 1; i <= n; i++)
            p[i] = min(p[i], i);
        for (int i = 1; i <= n; i++)
            s[i] = min(s[i], n - i + 1);
        vector<int> p1 = p, s1 = s;

        // for (int i = 1; i <= n; i++)
        //     p[i] += p[i - 1];
        for (int i = n - 1; i >= 1; i--)
            p[i] += p[i + 1];
        for (int i = 1; i <= n; i++)
            p[i] = min(p[i], i);

        for (int i = 1; i <= n; i++)
            s[i] += s[i - 1];
        // for (int i = n - 1; i >= 1; i--)
        //     s[i] += s[i + 1];
        for (int i = 1; i <= n; i++)
            s[i] = min(s[i], n - i + 1);

        for (int i = n - 1; i >= 1; i--)
        {
            // s1[i] += s1[i + 1];
            s1[i] = s1[i + 1] + min(n - i + 1 - s1[i + 1], s1[i]);
        }
        for (int i = 1; i <= n; i++)
        {
            // p1[i] += p1[i - 1];
            p1[i] = p1[i - 1] + min(i - p1[i - 1], p1[i]);
        }

        for (int i = 1; i <= n; i++)
        {
            s1[i] = min(s1[i], n - i + 1);
            p1[i] = min(p1[i], i);
        }
        for (int i = 1; i <= n; i++)
            p[i] += p1[i - 1];
        for (int i = 1; i < n; i++)
            s[i] += s1[i + 1];

        for (int i = 1; i <= n; i++)
        {
            // p[i - 1] = max(p[i - 1], p[i]);
            p[i] = min(p[i], i);
            s[i] = min(s[i], n - i + 1);
        }
        for (int i = n - 1; i >= 1; i--)
        {
            // s[i + 1] = max(s[i], s[i + 1]);
            s[i] = min(s[i], n - i + 1);
        }
        for (int i = 1; i <= n; i++)
        {
            // p[i - 1] = max(p[i - 1], p[i]);
            p[i] = min(p[i], i);
            s[i] = min(s[i], n - i + 1);
        }
        // for (int i = 1; i <= n; i++)
        //     cerr << p[i] << " \n"[i == n];
        // for (int i = 1; i <= n; i++)
        //     cerr << s[i] << " \n"[i == n];
        if (p[n] >= (n + 1) / 2 || s[1] >= (n + 1) / 2)
            return true;

        for (int i = 1; i + 1 <= n; i++)
        {
            if (p[i] + s[i + 1] >= (n + 1) / 2)
                return true;
        }
        return false;
    };
    ll lo = ll(-2e18)-1, hi = ll(2e18)+1, ans = 0;
    while (lo < hi - 1)
    {
        ll mi = (lo + hi) / 2;
        if (check(mi))
            lo = mi;
        else
            hi = mi;
        // ll mid = (lo + hi) / 2;
        // if (check(mid))
        //     lo = mid + 1, ans = mid;
        // else
        //     hi = mid - 1;
    }
    // cout << ans << '\n';
    cout << lo << '\n';
    // if(n==28308)
    //     assert(check(999999997000000000));
    // assert(check(lo + 1) == false);
    // assert(lo != -4e18);
    // cerr << check(11) << '\n';
    // cerr << check(25) << '\n';
    // cout << check(9) << '\n';
    // cout << check(10) << '\n';
    // cout << check(13) << '\n';
}
```

## I

### 题意

给你一个数组 $a$ ，每次你可以选择恰好 $k$ 个数字，并将这个 $k$ 个数字替换成它们的乘积。可以进行任意次操作，输出操作后数组的最大值。

### 思路

直接把大的数字乘到一起就好了，刚开始把前 $k$ 大的数字乘到一起，后面在把之后的数字，每次乘 $k-1$ 个过来，只用注意一下有没有 $0$ 。

同时，$x\mod mod = 0$ 不一定代表 $x=0$ 。注意一下，WA了三次。

```cpp
using ll = long long;

void ChatGptDeepSeek() // Date: 2025-04-13
{                      // Time: 14:47:32
    int n, k;
    cin >> n >> k;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    ll res = 1;
    sort(a.begin() + 1, a.end(), greater<int>());
    for (int i = 1; i <= k; i++)
    {
        res = res * a[i] % 998244353;
    }
    if (a[k] == 0)
    {
        cout << a[1] % 998244353 << '\n';
        return;
    }
    for (int i = k + 1; i + k - 2 <= n; i += k - 1)
    {
        ll now = 1;
        for (int j = i; j <= i + k - 2; j++)
        {
            now *= a[j];
            now %= 998244353;
        }
        if (a[i + k - 2] == 0)
            break;
        res = res * now % 998244353;
    }
    cout << res << '\n';
} // 2 2 2 2
// 4 4 ,
//
```