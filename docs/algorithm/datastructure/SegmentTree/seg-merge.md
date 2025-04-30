# 线段树合并

> 2025-04-30

很神奇， 目前只能说是半懂， 大概记得怎么写， 理解一部分吧。

## [CF600E](https://codeforces.com/contest/600/problem/E)

从这题决定看线段树合并的， 现在懂得差不多了。

这题是给一棵树， 每个节点会有一个颜色 $c$ ， 我们需要计算每个子树中的出现次数最多的颜色的和。

这个题我们可以用线段树去维护每种颜色出现的次数。

我们对树进行 dfs， 那么每个节点只需要合并它的每个子结点的线段树， 就可以知道这颗子树的信息。 

#### push up

这里是看左边和右边， 哪边出现的次数更多， 来决定如何合并。 这个还是比较显然的， 这里要理解左右孩子实际上是左右的区间， 是颜色的信息。 比如 $[l, r]$ 之间的颜色出现的次数以及答案。

#### update

实际上这题这涉及到单点修改， 如果这个点是空的， 肯定给它分配一个， 然后递归去改， 这里改的就是说给这个值的数量去增加。 改完记得 `push up` ， 跟普通线段树一样的。

#### merge

`merge` 函数是用于合并线段树的， 一般是把 $b$ 给合并到 $a$ 上， 递归合并， 若果有一个是空的， 肯定分配非空的那个， 到叶子节点时， 就是进行一个单点的合并。

```cpp
constexpr int N = int(1e5) + 5;
struct tree{
    int l, r, cnt;
    ll ans;
    tree(int v = 0){
        l = r = cnt = ans = v;
    }
};
tree tr[N * 50];
#define mi ((l + r) >> 1)
#define lson tr[p].l
#define rson tr[p].r
int cnt = 0, rt[N];
 
void push_up(int p)
{
    tr[p].cnt = max(tr[lson].cnt, tr[rson].cnt);
    if(tr[lson].cnt > tr[rson].cnt)
        tr[p].ans = tr[lson].ans;
    else if(tr[lson].cnt < tr[rson].cnt)
        tr[p].ans = tr[rson].ans;
    else
        tr[p].ans = tr[lson].ans + tr[rson].ans;
}
void update(int &now, int l, int r, int pos, int v)
{
    if(!now) now = ++cnt;
    if(l == r){
        // 到叶子节点了
        tr[now].cnt += v;
        tr[now].ans = l;
        return;
    }
    // 递归处理
    if(pos <= mi) update(tr[now].l, l, mi, pos, v);
    else update(tr[now].r, mi + 1, r, pos, v);
    push_up(now);
}
int merge(int a, int b, int l, int r)
{
    if(!a) return b;
    if(!b) return a;
    if(l == r){
        tr[a].cnt += tr[b].cnt;
        tr[a].ans = l;
        return a;
    }
    tr[a].l = merge(tr[a].l, tr[b].l, l, mi);
    tr[a].r = merge(tr[a].r, tr[b].r, mi + 1, r);
    push_up(a);
    return a;
}
void ChatGptDeepSeek() // Date: 2025-04-29
{                      // Time: 23:52:50 
    int n;
    cin >> n;
    cnt = n;
    vi c(n + 1);
    vl ans(n + 1);
    for(int i = 1; i <= n; i++){
        cin >> c[i];
        rt[i] = i;
    }
    vector<vi> g(n + 1, vi());
    for(int i = 1; i < n; i++){
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    auto dfs = [&](auto &&self, int u, int pre) -> void{
        for(auto v : g[u]){
            if(v == pre) continue;
            self(self, v, u);
            rt[u] = merge(rt[u], rt[v], 1, 100000);
        }
        update(rt[u], 1, 100000, c[u], 1);
        ans[u] = tr[rt[u]].ans;
    };
    dfs(dfs, 1, 0);
    for(int i = 1; i <= n; i++)
        cout << ans[i] << " \n"[i == n];
}
```

## [P4556 [Vani有约会] 雨天的尾巴 /【模板】线段树合并](https://www.luogu.com.cn/problem/P4556)

洛谷的模板题， 应该也是这一块最知名的一个题（）。感觉上面那题更模板， 不过这题也只是多了一个 LCA 和树上差分。

还是在树上的， 每次操作可以给 $x$ 到 $y$ 的路径增加一个 $z$ 物品， 需要查询每个点的最多的物品， 输出编号最小的那个。

查的是单点， 没想到这也能转化成查询子树。 它是把修改用树上差分来改， 改 $x$ 到 $y$ 的路径， 只需要把 $x$ 和 $y$ 的点加上 $1$ ， LCA$(x,y)$ 和它的父节点的值加上 $-1$ 。

```cpp
constexpr int N = int(1e5);
int siz[N + 1], fa[N + 1], dep[N + 1], son[N + 1], top[N + 1], dfn[N + 1];

struct tree{
    int l, r, cnt, ans;
    tree(int v = 0){
        l = r = ans = v;
    }
};
tree tr[N * 50];
int cnt;
#define lson tr[p].l
#define rson tr[p].r
#define mi ((l + r) >> 1)
void push_up(int p)
{
    tr[p].cnt = max(tr[lson].cnt, tr[rson].cnt);
    if(tr[lson].cnt >= tr[rson].cnt)
        tr[p].ans = tr[lson].ans;
    else
        tr[p].ans = tr[rson].ans;
}
void update(int &p, int l, int r, int pos, int v)
{
    if(!p) p = ++cnt;
    if(l == r){
        tr[p].cnt += v;
        tr[p].ans = l;
        return;
    }
    if(pos <= mi) update(lson, l, mi, pos, v);
    else update(rson, mi + 1, r, pos, v);
    push_up(p);
}
int merge(int a, int b, int l, int r)
{
    if(!a) return b;
    if(!b) return a;
    if(l == r){
        tr[a].cnt += tr[b].cnt;
        tr[a].ans = tr[b].ans;
        return a;
    }
    tr[a].l = merge(tr[a].l, tr[b].l, l, mi);
    tr[a].r = merge(tr[a].r, tr[b].r, mi + 1, r);
    push_up(a);
    return a;
}
void ChatGptDeepSeek() // Date: 2025-04-30
{                      // Time: 08:38:13 
    int n, m;
    cin >> n >> m;
    cnt = n;
    vector<vi> g(n + 1, vi());
    vi rt(n + 1), ans(n + 1);
    for(int i = 1; i < n; i++){
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    auto dfs1 = [&](auto &&self, int u, int pre) -> void{
        dep[u] = dep[pre] + 1, siz[u] = 1, fa[u] = pre;
        for(auto v : g[u]){
            if(v == pre) continue;
            self(self, v, u);
            siz[u] += siz[v];
            if(son[u] == 0 || siz[v] > siz[son[u]])
                son[u] = v;
        }
    };
    dfs1(dfs1, 1, 0);
    int cntd = 0;
    auto dfs2 = [&](auto &&self, int u, int pre) -> void{
        dfn[u] = ++cntd;
        top[u] = (son[pre] == u) ? top[pre] : u;
        if(son[u]) self(self, son[u], u);
        for(auto v : g[u]){
            if(v == pre || v == son[u]) continue;
            self(self, v, u);
        }
    };
    dfs2(dfs2, 1, 0);
    auto LCA = [&](int x, int y){
        while(top[x] != top[y]){
            if(dep[top[x]] < dep[top[y]]) swap(x, y);
            x = fa[top[x]];
        }
        return (dep[x] < dep[y]) ? x : y;
    };
    while(m--){
        int x, y, z;
        cin >> x >> y >> z;
        int lca = LCA(x, y);
        update(rt[x], 1, N, z, 1);
        update(rt[y], 1, N, z, 1);
        update(rt[lca], 1, N, z, -1);
        update(rt[fa[lca]], 1, N, z, -1);
    }
    auto dfs = [&](auto &&self, int u, int pre) -> void{
        for(auto v : g[u]){
            if(v == pre) continue;
            self(self, v, u);
            rt[u] = merge(rt[u], rt[v], 1, N);
        }
        ans[u] = tr[rt[u]].cnt ? tr[rt[u]].ans : 0;
    };
    dfs(dfs, 1, 0);
    for(int i = 1; i <= n; i++)
        cout << ans[i] << "\n";
}
```