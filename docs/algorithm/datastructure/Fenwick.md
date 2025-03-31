# 树状数组

> 2025-03-31

树状数组其实已经是比较高级的东西了吧，而且代码也比较短。其实我并不很懂里面的原理，只会背个模板。。

为什么ST表模板是黄，树状数组两个都是绿。。。

其实记得代码就行吧。如果没有时间。

常用操作主要是 **单点修改，区间查询** 或 **区间修改，单点查询**。单次修改查询复杂度为 $O(\log n)$ 。

## 单点修改，区间查询

[P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)

注意 add 时，可以判一下 $i$ 不为 $0$ ，否则哪天没准死循环。。。ask 也可以尽量写成 $i > 0$ ，这样碰到不小心有负数过来也没事。

``` cpp
using ll = long long;
struct Fenwick
{
    vector<ll> b;
    Fenwick(int n)
    {
        b = vector<ll>(n + 1);
    }
    int lowbit(int x) { return (x) & (-x); }
    void add(int i, int x)
    {
        while (i && i < b.size())
        {
            b[i] += x;
            i += lowbit(i);
        }
    }
    ll ask(int i)
    {
        ll res = 0;
        while (i > 0)
        {
            res += b[i];
            i -= lowbit(i);
        }
        return res;
    }
};
void ChatGptDeepSeek()
{
    int n, m;
    cin >> n >> m;
    vector<int> a(n + 1);
    Fenwick C(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        C.add(i, a[i]);
    }
    while (m--)
    {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1)
            C.add(x, y);
        else
            cout << C.ask(y) - C.ask(x - 1) << '\n';
    }
}
```

## 区间修改，单点查询

[P3368 【模板】树状数组 2](https://www.luogu.com.cn/problem/P3368)

其实是不是并不一定能区间修改。。区间加可以。如果能想到用差分，那就是普通的模板了。

前面内容相同，这里就省略了。

``` cpp
void ChatGptDeepSeek()
{
    int n, m;
    cin >> n >> m;
    vector<int> a(n + 1);
    Fenwick C(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    while (m--)
    {
        int op;
        cin >> op;
        if (op == 1)
        {
            int x, y, k;
            cin >> x >> y >> k;
            C.add(x, k);
            C.add(y + 1, -k);
        }
        else
        {
            int x;
            cin >> x;
            cout << C.ask(x) + a[x] << '\n';
        }
    }
}
```