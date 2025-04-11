# Trie

> 也是去年看过的，但之后基本没用过，前两天 Div. 3 的 G 题要用，正好再看看，顺便加到博客里来。🤓🤓🤓

### 检索字符串

#### [洛谷P2580](https://www.luogu.com.cn/problem/P2580)

这个还是比较基础的，属于是模板题了。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-10
{                      // Time: 10:31:36
    int n;
    cin >> n;
    vector<vector<int>> trie(n * 51, vector<int>(26, 0));
    vector<bool> word(n * 51), vis(n * 51);
    int tot = 0;
    auto Insert = [&](string s)
    {
        int cur = 0;
        for (auto x : s)
        {
            if (trie[cur][x - 'a'] == 0)
                trie[cur][x - 'a'] = ++tot;
            cur = trie[cur][x - 'a'];
        }
        word[cur] = true;
    };
    auto Find = [&](string s)
    {
        int cur = 0;
        for (auto x : s)
        {
            if (trie[cur][x - 'a'] == 0)
            {
                cout << "WRONG\n";
                return;
            }
            cur = trie[cur][x - 'a'];
        }
        if (vis[cur])
            cout << "REPEAT\n";
        else if (word[cur])
            cout << "OK\n", vis[cur] = true;
        else
            cout << "WRONG\n";
    };
    for (int i = 1; i <= n; i++)
    {
        string x;
        cin >> x;
        Insert(x);
    }
    int m;
    cin >> m;
    while (m--)
    {
        string x;
        cin >> x;
        Find(x);
    }
}
```

### 异或最大值

#### [洛谷P4551](https://www.luogu.com.cn/problem/P4551)

树上两点路径的异或值，等于两个点到根节点的异或路径值异或。

所以可以等价于给 $n$ 个数，找出异或值最大的两个数。可以用 trie 从高位往低位存，贪心地去取。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-10
{                      // Time: 19:30:23 
    int n;
    cin>>n;
    vector<vector<pii>>adj(n+1,vector<pii>());
    for(int i=1;i<n;i++){
        int u,v,w;
        cin>>u>>v>>w;
        adj[u].push_back({v,w});
        adj[v].push_back({u,w});
    }
    vector<int>s(n+1);
    auto dfs=[&](auto&& self,int u,int pre)->void{
        for(auto [v,w]:adj[u]){
            if(v==pre) continue;
            s[v]=s[u]^w;
            self(self,v,u);
        }
    };
    dfs(dfs,1,0);
    vector<vi>trie(n*31,vi(2));
    int tot=0;
    auto Insert=[&](int Val){
        int cur=0;
        for(int i=30;i>=0;i--){
            int x=Val>>i&1;
            if(!trie[cur][x])
                trie[cur][x]=++tot;
            cur=trie[cur][x];
        }
    };
    auto Find=[&](int Val){
        int cur=0,res=0;
        for(int i=30;i>=0;i--){
            int x=Val>>i&1;
            if(trie[cur][x^1]){
                res|=1<<i;
                cur=trie[cur][x^1];
            }else
                cur=trie[cur][x];
        }
        return res;
    };
    for(int i=1;i<=n;i++)
        Insert(s[i]);
    int ans=0;
    for(int i=1;i<=n;i++)
        ans=max(ans,Find(s[i]));
    cout<<ans<<'\n';
}
```

#### [CF2093G](https://codeforces.com/contest/2093/problem/G)

用 trie 找是否有两个数的异或值大于等于 $x$ 。

只需要多一点小小的二进制技巧，就可以做出来了，上次杭电某个位运算题。

每一个  $trie_{cur,x}$ 的值都是不同的，可以用来记状态，这里是用来记下标最大的这一位为 $1$ 的数字的下标。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-10
{                      // Time: 20:26:45
    int n, k;
    cin >> n >> k;
    vector<vi> trie(n * 31, vi(2));
    vi p(n * 32);
    int tot = 0, ans = n + 1;
    auto Insert = [&](int Val, int idx)
    {
        int cur = 0;
        for (int i = 30; i >= 0; i--)
        {
            int x = Val >> i & 1;
            if (trie[cur][x] == 0)
                trie[cur][x] = ++tot;
            cur = trie[cur][x];
            p[cur] = idx;
        }
    };
    auto Find = [&](int Val)
    {
        int cur = 0, now = 0, L = -1;
        for (int i = 30; i >= 0; i--)
        {
            int x = Val >> i & 1;
            int y = k >> i & 1;
            if (y)
            {
                if (!trie[cur][x ^ 1])
                    return L;
                cur = trie[cur][x ^ 1];
            }
            else
            {
                if (trie[cur][x ^ 1])
                    cmax(L, p[trie[cur][x ^ 1]]);
                if (trie[cur][x] == 0)
                    return L;
                cur = trie[cur][x];
            }
        }
        cmax(L,p[cur]);
        return L;
    };
    for (int i = 1; i <= n; i++)
    {
        int x;
        cin >> x;
        int L=Find(x);
        if(L>0) ans=min(ans,i-L+1);
        Insert(x, i);
    }
    if (k == 0)
        cout << "1\n";
    else if (ans == n + 1)
        cout << "-1\n";
    else
        cout << ans << '\n';
}
```