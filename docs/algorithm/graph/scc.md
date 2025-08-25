# 强连通分量

强连通是指有向图中，任意两个点都互相可达。

强联通分量是极大的强连通子图。

用 tarjan 求强连通分量挺方便的，有些题可以用来缩点，缩点后的图会是 DAG，可以更方便解决某些问题。

## Tarjan

$dfn_u$ 表示 $u$ 的 $dfs$ 序。

$low_u$ 表示 $u$ 可以到达的，不属于其他 scc 里的点里的最小的 $dfs$ 序。

将所有遍历到的不属于其他 scc 的点入栈。

当 $low_u = dfn_u$ 时，当前栈内的点，必然都属于一个强连通分量。

代码其实也比较简单。。。这里也不知道要记点什么，其实只是为了以后忘了来稍微看一眼。

## P3387 【模板】缩点

在一个强连通分量的点肯定都能到，所以直接用 tarjan 缩点，然后就变成 DAG了，求一条边权最大的链就可以了。

本来对于 DAG，我们是要搞一个拓扑排序的，但是 tarjan 之后的顺序直接就是拓扑排序的逆序，就比较方便。

```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;

vector<vector<int>> g;
vector<pair<int, int>> edges;
constexpr int N = 10010;
int dfn[N], low[N], instk[N], tot;
int scc[N], A[N], sc, a[N];
vector<int> stk;
void tarjan(int u)
{
    dfn[u] = low[u] = ++tot;
    instk[u] = 1, stk.push_back(u);
    for(auto v : g[u]){
        if(!dfn[v]){
            tarjan(v);
            low[u] = min(low[u], low[v]);
        }else if(instk[v])
            low[u] = min(low[u], dfn[v]);
    }
    if(low[u] == dfn[u]){
        ++sc;
        for(int k = -1; k != u; ){
            k = stk.back(); stk.pop_back();
            scc[k] = sc, A[sc] += a[k];
            instk[k] = false;
        }
    }
}
void solve()
{
    int n, m; cin >> n >> m;
    g.assign(n + 1, vector<int>()), edges.assign(m, {0, 0});
    for(int i = 1; i <= n; i++) cin >> a[i];
    for(int i = 0; i < m; i++){
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        edges[i] = {u, v};
    }
    for(int i = 1; i <= n; i++)
        if(!dfn[i]) tarjan(i);
    g.assign(sc + 1, vector<int>());
    for(auto [u, v] : edges){
        u = scc[u], v = scc[v];
        if(u != v){
            g[u].push_back(v);
        }
    }
    vector<int> dp(sc + 1);
    for(int i = 1; i <= sc; i++){
        dp[i] = A[i];
        sort(g[i].begin(), g[i].end());
        g[i].erase(unique(g[i].begin(), g[i].end()), g[i].end());
    }
    for(int i = sc; i >= 1; i--){
        for(auto v : g[i]){
            dp[v] = max(dp[v], A[v] + dp[i]);
        }
    }
    cout << ranges::max(dp) << '\n';
}

int main()
{
    ios::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);
    // int t; cin >> t; while(t--)
    {solve();} return 0;
}
```

## 练习题

[P2986 [USACO10MAR] Great Cow Gathering G](https://www.luogu.com.cn/problem/P2986)

[P2272 [ZJOI2007] 最大半连通子图](https://www.luogu.com.cn/problem/P2272)

[P2515 [HAOI2010] 软件安装](https://www.luogu.com.cn/problem/P2515)