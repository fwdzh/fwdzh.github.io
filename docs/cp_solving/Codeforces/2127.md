# Atto Round 1 (Codeforces Round 1041, Div. 1 + Div. 2)

> 2025-08-09

## A

给一个长度为 $n$ 的数组，是否可以通过把其中的 $-1$ 更换成任意数字，使得对于 $1 \le i \le n - 2$ :

$mex(a_i, a_{i + 1}, a_{i + 2}) = max(a_i, a_{i + 1}, a_{i + 2}) - min(a_i, a_{i + 1}, a_{i + 2})$

### solution

三个数字的 MEX 值只可能等于 ${0, 1, 2, 3}$。

当 $mex > 0 $ 时，$min(a_i, a_{i + 1}, a_{i + 2}) = 0$，于是 $max(a_i, a_{i + 1}, a_{i + 2}) = mex$，那么显然对于 $mex = x$ 的数组，其中肯定不能出现值等于 $x$ 的元素。

所以当且仅当 $mex(a_i, a_{i + 1}, a_{i + 2}) = 0$ 时可以满足条件，所以 $a$ 中所有元素必须全部相等且不等于 $0$ 才可以是一个好数组。

### code

```cpp
// Date: 2025-08-07
// Time: 22:37:15
void ChatGptDeepSeek()
{
    int n;
    cin >> n;
    vector<int> a(n + 1);
    for(int i = 1; i <= n; i++)
        cin >> a[i];
    if(count(a.begin() + 1, a.end(), 0)){
        cout << "NO\n";
        return;
    }
    int mx = *max_element(a.begin() + 1, a.end());
    for(int i = 1; i <= n; i++){
        if(a[i] != -1 && a[i] != mx){
            cout << "NO\n";
            return;
        }
    }
    cout << "YES\n";
}
```

## B

有一个长度为 $n$ 的通道，有 $n$ 个格子，最左边的是第 $1$ 个，刚开始时 Hamid 在第 $x$ 个格子。有一些格子是空的，有一些格子是墙。

在每一天开始的时候 Mani 会选择一个空格子，并在这个格子上建一堵墙。

然后 Hamid 会选择一个方向，如果这个方向上没有格子了，那么他可以离开，否则他会摧毁这个方向上离他最近的墙，这一天结束时他会呆在这个地方。

Hamid 想早点离开，Mani 不想让 Hamid 早点离开。如果两人都足够聪明，Hamid 需要多少天才能离开？

### solution

如果当前一堵墙都没有，那么 Mani 只能在一个方向建墙，所以 Hamid 一天就可以离开。

让答案为 $ans$，那么显然 $ans \le min(x, n - x + 1)$，因为如果啥都不管只往一个方向走，肯定至少能达到这个数字。

但如果只考虑了这个，我喜提了 Wa on test 2。

因为 Hamid 其实是可以瞬移到离他最近的墙，我们可以找到离他左边和右边最近的墙，分别记它们的位置为 $L, R$。Hamid 一定可以用一天到达 $L$，或 $R$。那么 $ans \le max(L + 1, n - R + 2)$。

因为假如 $L + 1$ 更小，那么 Mani 肯定会在 $x - 1$ 建墙，使得你无法瞬移到 $L$，反之他会在 $x + 1$ 建墙，所以只能取 max。

### code

```cpp
// Date: 2025-08-07
// Time: 22:48:46
void ChatGptDeepSeek()
{
    int n, x;
    cin >> n >> x;
    string s; cin >> s;
    int ans = min(x, n - x + 1);
    s = " " + s;
    int L = 0, R = n + 1;
    for(int i = x - 1; i >= 1; i--){
        if(s[i] == '#'){
            L = i;
            break;
        }
    }
    for(int i = x + 1; i <= n; i++){
        if(s[i] == '#'){
            R = i;
            break;
        }
    }
    ans = min(ans, max(L + 1, n - R + 1 + 1));
    cout << ans << '\n';
}
```

## C

有两个长度为 $n$ 的数组 $a, b$。

Ali 和 Bahamin 在玩一个游戏，持续 $k$ 回合。在每回合中：

- 首先，Ali 选择两个下标 $i$ 和 $j$ ($1 \le i < j \le n$)；

- 然后 Bahamin 可以重新排列 $a_i, a_j, b_i, b_j$，交换几个数字的值，也可以让这几个数字保持不变。

在 $k$ 轮游戏之后，游戏的得分为 $v = \sum\limits_{i=1}^n |a_i - b_i|$. Ali 希望 $v$ 尽量小，Bahamin 希望 $v$ 尽量大，并且两个人都足够聪明，最终的 $v$ 是多少。

### solution

- hint 1

    $k$ 轮游戏后，$v$ 不可能减小，因为如果减小，Bahamin 肯定不操作，那值起码不会变。

- hint 2

    Ali 只会选择一对不同的 $(i, j)$，Bahamin 也最多只有第一次需要进行操作。Bahamin 一定可以使得操作后，可以达到最大的 $v$。

所以我们只需要去找一对 $(i, j)$ 使得进行操作后，$v$ 的增加值尽量小。

想一下，假如我们有四个数字，$v1 \le v2 \le v3 \le v4$，我们想要假设它们是我们选的 $a_i,a_j,b_i,b_j$ 那四个数字，操作之后 $|a_i - b_i| + |a_j - b_j|$ 的值可能是什么呢？

其实就是排列组合嘛，其中最大的一定是 $v3 + v4 - v1 - v2$。也就是我们交换后，不要让最大的两个数字的下标相同，就可以使得答案变得最大。

由于可以自由交换，我们可以交换 $a_i,b_i$，使得 $a_i >= b_i$，然后我们按 $a$ 的值递增排序。

那么对于 $i < j$，一定有 $a_i \le a_j,b_j \le a_j, b_i \le b_j$。所以 $a_j$ 一定是这几个数字中最大的。

它们四个的关系只能是

```
v2 v4
v1 v3
```

或者

```
v3 v4 or v3 v4
v1 v2    v2 v1
```

对于下面的两种，这四个数字的贡献已经是 $v4 + v3 - v2 - v1$，所以不会让答案变大。假设存在满足这种关系的 $(i, j)$ 那么答案不会变。

对于第一种，其对答案的贡献为 $v4 + v2 - v3 - v1$。Bahamin 交换之后，答案的变化为 $(v4 + v3 - v2 - v1) - (v4 + v2 - v3 - v1) = 2(v3 - v2)$。

所以若无使得答案不变的 $(i,j)$，交换并排序之后，$b$ 也一定是一个有序数组。

若不存在 $1$ 的情况，$v$ 会增加 $2\min\limits_{1 \le i < j \le n} (b_j - a_i)$ 。

### code

```cpp
// Date: 2025-08-07
// Time: 23:25:18
void ChatGptDeepSeek()
{
    int n, m;
    cin >> n >> m;
    vector<pair<int, int>> a(n + 1);
    for(int i = 1; i <= n; i++) cin >> a[i].first;
    for(int i = 1; i <= n; i++) cin >> a[i].second;
    ll ans = 0;
    for(int i = 1; i <= n; i++){
        if(a[i].first < a[i].second)
            swap(a[i].first, a[i].second);
        ans += a[i].first - a[i].second;
    }
    int add = INF;
    sort(a.begin() + 1, a.end(), [](pair<int,int> x, pair<int, int> y){
        return x.first < y.first;
    });
    for(int i = 2; i <= n; i++){
        auto [x, y] = a[i];
        if(a[i - 1].first >= y){
            cout << ans << "\n";
            return;
        }
        add = min(add, y - a[i - 1].first);
    }
    cout << ans + 2 * add << '\n';
}
```

## D

有 $n$ 个房子 $m$ 座桥，这 $n$ 个房子可以通过这些桥联通。

问有多少种排列房子的方式，使得有桥连接的房子都在河的两边，且所有桥之间不会交叉。

### solution

- hint 1
    桥的数量一定只能是 $n - 1$，否则就会存在环，有环的话就百分百不行。

- hint 2
    一个节点的子节点中，不是叶子的节点最多只能有两个。

> 我赛时没写出这题，之后也是又想了挺久才想明白。我当时是直接先确定树的根节点，然后每个点的子节点中的叶子节点可以自由排列。然后我想的非常混乱了，我找一个有两个不是叶子的子节点的点作为根节点，然后 dfs，乘每个点的非叶子子节点数量的排列。。。但显然这是错的，而且我到最后也越写越不知道怎么确定根节点，也不能确定什么时候需要乘2。

我想的是，根节点有时候会有2个不是叶子节点的子节点，有时候是1个，这让我很不好算答案啊。

但是看了题解才发现一个有用的事情，如果去掉所有的叶子节点，剩下的部分一定是一条链。

这条链一定是相邻的节点在河的不同边，所以最左边的节点其实是可以确定的，每个点的叶子节点的数量都可以自由排列，所以直接算就好了。画个图就会非常的清晰了。

如果这条链上至少有两个节点，那么则可以左右对称一下，答案可以乘2。

```cpp
#include<bits/stdc++.h>
using namespace std;
using LL = long long;

constexpr int mod = int(1e9) + 7;
constexpr int N = int(2e5);
int fact[N + 1];
void solve()
{
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n + 1);
    vector<int> d(n + 1);
    for(int i = 1; i <= m; i++){
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
        d[u]++, d[v]++;
    }
    if(m != n - 1){
        cout << "0\n";
        return;
    }
    int ans = 2, cnt = 0;
    for(int u = 1; u <= n; u++){
        int leaf = 0, not_leaf = 0;
        for(int v : g[u]){
            if(d[v] == 1) leaf++;
            else not_leaf++;
        }
        if(d[u] > 1) cnt++;
        if(not_leaf > 2){
           ans = 0; break;
        }
        ans = 1LL * ans * fact[leaf] % mod;
    }
    if(cnt > 1) ans = 2 * ans % mod;
    cout << ans << '\n';
}
int main()
{
    ios::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);
    fact[0] = 1;
    for(int i = 1; i <= N; i++)
        fact[i] = 1LL * fact[i - 1] * i % mod;
    int T; cin >> T; while(T--)
    {solve();} return 0;
}
```