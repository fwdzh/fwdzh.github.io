# 笛卡尔树

> 2025-04-01

我暂时也不太知道这玩意能干啥。。。因为好像难点的题有点难了，而且也没怎么遇到过需要用这个的题目。

是因为杭州M要用这个才来看看。

简单说下吧，就是单调栈来建树。左右孩子都是比它小或大的数字。且顺序是按原序列的顺序。好像非常简单。建树之类的，代码也是非常好理解。

## [P5854 【模板】笛卡尔树](https://www.luogu.com.cn/problem/P5854)

模板题写了就是完全不知道它会有什么用。

```cpp
void ChatGptDeepSeek()
{
    int n;
    cin >> n;
    vector<int> p(n + 1), l(n + 1), r(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> p[i];
    auto build = [&]()
    {
        vector<int> stk;
        for (int i = 1; i <= n; i++)
        {
            while (!stk.empty() && p[stk.back()] > p[i])
                l[i] = stk.back(), stk.pop_back();
            if (!stk.empty())
                r[stk.back()] = i;
            stk.push_back(i);
        }
    };
    build();

    long long L = 0, R = 0;
    for (int i = 1; i <= n; i++)
    {
        // cerr << l[i] << " " << r[i] << " \n";
        L ^= 1LL * i * (l[i] + 1);
        R ^= 1LL * i * (r[i] + 1);
    }
    cout << L << " " << R << '\n';
}
```

## [2024ICPC杭州区域赛M](https://codeforces.com/gym/105657/problem/M)

这个感觉还稍微能体现一点用途。

这里是用于检查对于每一个子区间，都满足子区间的最小值可以整除子区间里的所有数字。实际上只需要建笛卡尔树，然后整除是具有传递性的，且笛卡尔树是满足原序列的顺序，就是左孩子一定是在原序列中这个数字的左边。

只需要判断每一个节点，可以整除它的两个子节点，即满足条件。检查了所有子区间，时间复杂度却只有 $O(n)$ 。

