# 树链剖分

> 2025-04-17
>
> 昨晚看了一小时视频，左程云的，感觉讲得挺好的。等会再去看看。

需要会基础的 dfs 以及 线段树，线段树只要会模板就行。

树链剖分通过把树拆分成链，使得我们可以把路径以及点权，这样可以把路径和子树的修改查询转化为数组上的区间查询区间修改。可以用线段树解决。

边权的问题也可以转换成点权。树剖还可以用来求 LCA ，同样是 $n\log n$ 复杂度。

## 路径/子树 修改查询

### [P3384 【模板】重链剖分/树链剖分](https://www.luogu.com.cn/problem/P3384)

模板题。$dfn$ 数组用来记录每个节点的新的编号，$siz$ 表示每个节点的子树大小，$fa$ 表示父节点编号，$top$ 表示每个节点的重链的头节点，$son$ 表示每个节点的重儿子的编号，$dep$ 表示每个节点的深度。

我是跟左程云学的变量名，可以学习 oi-wiki 或者算法书，也可以学习别人的代码。

```cpp
constexpr int N = int(1e5) + 5;
int a[N], siz[N], fa[N], dfn[N], top[N], seg[N], son[N], dep[N], tr[N << 2], tag[N << 2];
int mod, cntd = 0;
#define ls p<<1
#define rs p<<1|1
#define mi ((l+r)>>1)

void build(int p, int l, int r)
{
    if (l == r)
    {
        tr[p]=a[seg[l]]%mod;
        return;
    }
    build(ls,l,mi),build(rs,mi+1,r);
    tr[p]=(tr[ls]+tr[rs])%mod;
}
void push_down(int p,int l,int r)
{
    if(tag[p]){
        tr[ls]=(tr[ls]+1LL*(mi-l+1)*tag[p]%mod)%mod;
        tag[ls]=(tag[ls]+tag[p])%mod;
        tr[rs]=(tr[rs]+1LL*(r-mi)*tag[p]%mod)%mod;
        tag[rs]=(tag[rs]+tag[p])%mod;
        tag[p]=0;
    }
}
void upd(int p,int l,int r,int lx,int rx,int val)
{
    if(l>=lx&&r<=rx){
        tr[p]=(tr[p]+1LL*(r-l+1)*val%mod)%mod;
        tag[p]=(tag[p]+val)%mod;
        return;
    }
    push_down(p,l,r);
    if(lx<=mi) upd(ls,l,mi,lx,rx,val);
    if(rx>mi) upd(rs,mi+1,r,lx,rx,val);
    tr[p]=(tr[ls]+tr[rs])%mod;
}
int query(int p,int l,int r,int lx,int rx)
{
    if(l>=lx&&r<=rx) return tr[p];
    push_down(p,l,r);
    int res=0;
    if(lx<=mi) res+=query(ls,l,mi,lx,rx);
    if(rx>mi) res+=query(rs,mi+1,r,lx,rx);
    return res%mod;
}
void ChatGptDeepSeek() // Date: 2025-04-17
{                      // Time: 13:21:44
    int n, m, r;
    cin >> n >> m >> r >> mod;
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    vector<vi> adj(n + 1, vi());
    for (int i = 1; i < n; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v), adj[v].push_back(u);
    }
    auto dfs1 = [&](auto &&self, int u, int pre) -> void
    {
        siz[u] = 1;
        dep[u] = dep[pre] + 1;
        for (auto v : adj[u])
        {
            if (v == pre)
                continue;
            self(self, v, u);
            fa[v] = u;
            siz[u] += siz[v];
            if (son[u] == 0 || siz[v] > siz[son[u]])
                son[u] = v;
        }
    };
    dfs1(dfs1, r, 0);
    auto dfs2 = [&](auto &&self, int u, int pre) -> void
    {
        dfn[u] = ++cntd;
        seg[cntd] = u;
        if(son[pre]==u) top[u]=top[pre];
        else top[u]=u;
        if(son[u])
            self(self, son[u], u);
        for (auto v : adj[u])
        {
            if (v == pre || v == son[u])
                continue;
            self(self, v, u);
        }
    };
    dfs2(dfs2, r, 0);
    build(1,1,n);
    auto op1=[&](int x,int y,int z){
        while(top[x]!=top[y]){
            if(dep[top[x]]>=dep[top[y]]){
                upd(1,1,n,dfn[top[x]],dfn[x],z);
                x=fa[top[x]];
            }else{
                upd(1,1,n,dfn[top[y]],dfn[y],z);
                y=fa[top[y]];
            }
        }
        if(dep[x]>dep[y]) swap(x,y);
        upd(1,1,n,dfn[x],dfn[y],z);
    };
    auto op2=[&](int x,int y){
        int res=0;
        while(top[x]!=top[y]){
            if(dep[top[x]]>=dep[top[y]]){
                res=(res+query(1,1,n,dfn[top[x]],dfn[x]))%mod;
                x=fa[top[x]];
            }else{
                res=(res+query(1,1,n,dfn[top[y]],dfn[y]))%mod;
                y=fa[top[y]];
            }
        }
        if(dep[x]>dep[y]) swap(x,y);
        res=(res+query(1,1,n,dfn[x],dfn[y]))%mod;
        cout<<res<<'\n';
    };
    while(m--){
        int op;
        cin>>op;
        if(op==1){
            int x,y,z;
            cin>>x>>y>>z;
            op1(x,y,z);
        }else if(op==2){
            int x,y;
            cin>>x>>y;
            op2(x,y);
        }else if(op==3){
            int x,z;
            cin>>x>>z;
            upd(1,1,n,dfn[x],dfn[x]+siz[x]-1,z);
        }else{
            int x;
            cin>>x;
            cout<<query(1,1,n,dfn[x],dfn[x]+siz[x]-1)<<'\n';
        }
    }
}
```