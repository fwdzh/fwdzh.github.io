# 线段树

## 最大子段和 + 单点修改

Codeforces 的 EDU 的原题，当时学得很难受啊，就是莫名其妙看不懂的，很坐牢，估计也是花了很久才 AC 那个题。但是前两天就在洛谷看到一个跟这一样的题，是个蓝题，然后就没有难受了。

其实只需要知道怎么合并就好写了。我们需要知道最大子段和，那么有哪些情况呢？

1. 最大子段和全在左孩子节点
2. 最大子段和全在右孩子节点
3. 最大子段和穿过了两边

那么对于第 1 和 第 2 种情况，最大子段和一定是等于左孩子和右孩子节点的最大值。

对于第 3 种情况，它的最大子段和 一定是 左孩子的最大的后缀加上右孩子的最大的前缀。

由于只会有三种情况，此时我们就知道了我们需要维护的信息有: 最大前缀 最大后缀 最大子段和。

还有什么呢？如何更新最大前缀和最大后缀？还需要记录的信息还有区间和，

最大前缀等于左孩子最大前缀 和 左孩子的和+右孩子最大前缀。

所以现在就可以直接写了。

```cpp
using ll = long long;

const ll LNF = 1e18;

struct SegTree {
// 需要知道每一段的最大的前缀 最大的后缀
// 以及这一段的和 可能还需要其他的信息
// 还有这一段的最大子段和
#define ls p << 1
#define rs p << 1 | 1
#define mid ((l + r) >> 1)
    struct info {
        ll sum, pre, suf, res;
    };
    vector<info> tr;
    info merge(info x, info y)
    {
        info res = { 0, 0, 0, 0 };
        res.pre = max(x.pre, x.sum + y.pre);
        res.suf = max(y.suf, y.sum + x.suf);
        res.sum = x.sum + y.sum;
        res.res = max({ res.pre, res.suf, x.suf + y.pre, x.res, y.res });
        return res;
    }
    info query(int p, int l, int r, int lx, int rx)
    {
        if (l >= lx && r <= rx)
            return tr[p];
        if (lx <= mid && rx > mid)
            return merge(query(ls, l, mid, lx, rx), query(rs, mid + 1, r, lx, rx));
        if (lx <= mid)
            return query(ls, l, mid, lx, rx);
        if (rx > mid)
            return query(rs, mid + 1, r, lx, rx);
    }
    void upd(int p, int l, int r, int x, int val)
    {
        if (l == r) {
            tr[p] = { val, val, val, val };
            return;
        }
        if (x <= mid)
            upd(ls, l, mid, x, val);
        else
            upd(rs, mid + 1, r, x, val);
        tr[p] = merge(tr[ls], tr[rs]);
    }
    SegTree(vector<int>& a)
    {
        tr = vector<info>(a.size() << 2);
        auto build = [&](auto&& self, int p, int l, int r) -> void {
            if (l == r) {
                tr[p] = { a[l], a[l], a[l], a[l] };
                return;
            }
            self(self, ls, l, mid);
            self(self, rs, mid + 1, r);
            tr[p] = merge(tr[ls], tr[rs]);
        };
        build(build, 1, 1, a.size() - 1);
    }
};

void ChatGptDeepSeek()
{
    // 实际上就是要查询区间的最大子段和
    int n, m;
    cin >> n >> m;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    SegTree C(a);
    while (m--) {
        int k;
        cin >> k;
        if (k == 1) {
            int l, r;
            cin >> l >> r;
            if (l > r)
                swap(l, r);
            cout << C.query(1, 1, n, l, r).res << '\n';
        } else {
            int x, val;
            cin >> x >> val;
            C.upd(1, 1, n, x, val);
        }
    }
}
```

但是 query 会报无返回值的警告。。不过大家很多都是这样写的，而且这里其他情况返回值也没有啥意义的。