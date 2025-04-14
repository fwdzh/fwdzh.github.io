# 2025蓝桥杯省赛B组 C/C++

> 2025-04-12
>
> 菜麻了,两道填空题都没对,最后一题都没看,提前一小时走。。。服了阿，这个最后一题很简单阿，比起FG感觉简单很多，当时，为什么不多看一会呢？为什么不想想找规律呢？我的三百块...

![](../../../../assets/maodie.gif)

## A

最短的距离就是一个半径加上一段弧长。为什么写错了呢？因为我以为只用求方式一移动的距离。。。

求角度可以用 `atan2` , `acos` 这些函数。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-12
{                      // Time: 17:53:59 
    double degree=atan2(666,233);
    double r=sqrt(666*666+233*233);
    cout<<r+degree*r<<'\n';
}
```

## B

没怎么证明，但是提前在群里看到有人说答案是 $2^(1024)$ .

并不太想证明。

```python
import math
print(pow(2,1012,1000000007))
```

## C

直接输出不等于 $1$ 的数字的数量。

```python
n = int(input())
a = list(map(int,input().split()))
ans = 0
for i in a:
    if i!=1:
        ans+=1
print(ans)
```

## D

直接循环就行，不超过 $\log$ 次就会使得三个数字相同了。

直接写循环然后输入一些数据找规律，然后发现很快就会三个数字相等。就算不发现这个，想写暴力，加个 break 总不会更差吧。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-12
{                      // Time: 16:52:51 
    int a,b,c,k;
    cin>>a>>b>>c>>k;
    for(int i=1;i<=k;i++){
        int A=(b+c)/2,B=(a+c)/2,C=(a+b)/2;
        if(A==a&&B==b&&C==c) break;
        a=A,b=B,c=C;
    }
    cout<<a<<" "<<b<<" "<<c<<'\n';
}
```

## E

很经典的签到题吧，一定只会取一个大小连续的区间，否则答案肯定会更大。

所以排序后遍历每连续的 $m$ 个数字就行。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-12
{                      // Time: 16:54:38 
    int n,m;
    cin>>n>>m;
    vector<long long>a(n+1);
    for(int i=1;i<=n;i++)
        cin>>a[i],a[i]*=a[i];
    sort(a.begin()+1,a.end());
    long long res=0;
    for(int i=1;i<m;i++)
        res+=a[i+1]-a[i];
    long long ans=res;
    for(int i=m+1;i<=n;i++){
        res-=a[i-m+1]-a[i-m];
        res+=a[i]-a[i-1];
        ans=min(ans,res);
    }
    cout<<ans<<'\n';
}
```

## F

写了一小时。。。也是考虑过很多方式，比如 dfs 之类的。后来想到之前做过的一个 CF 题目，也是同样给两个字符串，是用 DP 写的。[CF2022C](https://codeforces.com/contest/2022/problem/C) ，这还有1800呢，不过这个CF题确实比蓝桥杯这个题难很多吧。

那么这个题为什么可以 DP 呢？考虑一下每一列的两个字符，总共只会有四种情况，`..`, `.#`, `#.`, `##` 。所以我们可以考虑计算每一列变成每一种状态所需要的最小花费。

我们要使得前面全都合法，所以如果这一列有 `#` ， 那么前一列也必须要有能和这一列连着的 `#` 。就两个字符，好像不算啥状压DP。。洛谷评黄色好像确实没问题。

```cpp
constexpr int N = 1000010;
int dp[N][4], a[4];

void ChatGptDeepSeek() // Date: 2025-04-12
{                      // Time: 16:57:08
    string s[2];
    cin >> s[0] >> s[1];
    int n = s[0].size();
    s[0] = " " + s[0];
    s[1] = " " + s[1];
    auto work = [&](int i)
    {
        for (int j = 0; j < 4; j++)
        {
            a[j] = 0;
            int x = j >> 1 & 1, y = j & 1;
            if (x)
            {
                if (s[0][i] == '.')
                    a[j]++;
            }
            else
            {
                if (s[0][i] == '#')
                {
                    a[j] = -1;
                    continue;
                }
            }
            if (y)
            {
                if (s[1][i] == '.')
                    a[j]++;
            }
            else
            {
                if (s[1][i] == '#')
                {
                    a[j] = -1;
                    continue;
                }
            }
        }
    };
    for (int i = 0; i < 4; i++)
    {
        work(1);
        dp[1][i] = a[i];
    }
    for (int i = 2; i <= n; i++)
    {
        work(i);
        for (int x = 0; x < 4; x++)
        {
            if (a[x] == -1)
                dp[i][x] = -1;
            else
                dp[i][x] = 1000000000;
        }
        for (int x = 0; x < 4; x++)
        {
            if (dp[i - 1][x] == -1)
                continue;
            for (int y = 0; y < 4; y++)
            {
                if (dp[i][y] == -1)
                    continue;
                if (x == 3 && y)
                    dp[i][y] = min(dp[i][y], dp[i - 1][x] + a[y]);
                if (y == 3 && x)
                    dp[i][y] = min(dp[i][y], dp[i - 1][x] + a[y]);
                if (x == y)
                    dp[i][y] = min(dp[i][y], dp[i - 1][x] + a[y]);
                if (y == 0)
                    dp[i][y] = min(dp[i][y], dp[i - 1][x]);
            }
        }
    }
    int ans = 1000000000;
    for (int i = 0; i < 4; i++)
    {
        if (dp[n][i] != -1)
            ans = min(ans, dp[n][i]);
    }
    if (ans == 0)
    {
        cout << ans << '\n';
        return;
    }
    for (int i = 1; i <= n; i++)
    {
        if (s[0][i] == '#' || s[1][i] == '#')
            break;
        ans--;
    }
    cout << ans << '\n';
}
```

## G

洛谷评的绿，感觉差不多。是一个比较经典的树形背包DP。。

比赛前一天刚好写了一道类似的题目，也是写的第一题这种题。。。是[P1273 有线电视网](https://www.luogu.com.cn/problem/P1273) ，比蓝桥杯这题难一些吧。

这题其实就是说每一个结点都有一个最大权值，每个点的权值等于它的若干个子结点的权值之和，且这个值必须小于等于他的最大权值。让我们求根节点 $1$ 的最大可能的权值。

就是典型的背包问题了吧。

```cpp
using ll = long long;
using vi = vector<int>;

int n;
vi w;
vector<vi> adj;
bool dp[1024][1024];
bool pd[1024][1024];

int siz[1024];

void dfs(int u, int pre)
{
    // cerr<<u<<" "<<pre<<'\n';
    for (int i = 0; i < adj[u].size(); i++)
    {
        int v = adj[u][i];
        // cerr<<v<<'\n';
        if (v == pre)
            continue;
        dfs(v, u);
        for (int x = 0; x <= w[u]; x++)
        {
            // if (dp[u][x] == false)
            //     continue;
            for (int y = 0; x + y <= w[u] && y <= w[v]; y++)
            {
                if (dp[u][x] && dp[v][y])
                {
                    pd[u][x + y] = true;
                }
            }
        }
        for (int x = 0; x <= w[u]; x++)
            dp[u][x] = pd[u][x];
    }
}
void dfs1(int u, int pre)
{
    for (int i = 0; i < adj[u].size(); i++)
    {
        int v = adj[u][i];
        if (v == pre)
            continue;
        siz[u]++;
        dfs1(v, u);
    }
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    cin >> n;
    w = vector<int>(n + 1);
    adj = vector<vi>(n + 1, vi());
    for (int i = 1; i <= n; i++)
        cin >> w[i];
    for (int i = 1; i < n; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs1(1, 0);
    for (int i = 1; i <= n; i++)
    {
        if (siz[i] == 0)
        {
            dp[i][w[i]] = true;
            pd[i][w[i]] = true;
        }
        dp[i][0] = true;
        pd[i][0] = true;
    }
    dfs(1, 0);
    for (int i = w[1]; i >= 0; i--)
    {
        if (dp[1][i])
        {
            cout << i << '\n';
            return 0;
        }
    }
    return 0;
}
```

## H

> 什么鬼，这题其实比上两题都简单吧，赛时感觉不太想看了，感觉不太好做，就去吃饭了。。。一定是因为早餐就吃了两个包子没状态导致的。

因为加法减法是会抵消的，所以最后只会留下若干个异或的前缀，例如 $a_1+()$ 会和 $a_1-()$ 抵消，括号的数量是 $3^{剩下符号数量}$ ，所以就写出来了。

再加上一个全部的异或和。

```cpp
constexpr int mod = int(1e9) + 7;
ll ksm(ll a, ll b)
{
    ll res = 1;
    while (b)
    {
        if (b & 1)
            res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}
void ChatGptDeepSeek() // Date: 2025-04-15
{                      // Time: 00:14:11
    int n;
    cin >> n;
    ll ans = 0, s = 0;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    s = 0;
    for (int i = 1; i < n; i++)
        s ^= a[i], ans = (ans + 2 * ksm(3, n - i - 1) * s % mod) % mod;
    s^=a[n];
    ans = (ans + s) % mod;
    cout << ans << '\n';
}
```