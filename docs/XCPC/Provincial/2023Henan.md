# 2023年第五届河南省CCPC大学生程序设计竞赛

>2025-04-05

比赛链接: https://codeforces.com/gym/104354

总的来说这一场还是烂完了。。。

## A

签到

## F

最优的肯定是选择大小连续的一段，不然你总是可以把最边上的往中间选，可以使得答案更小。

```cpp
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int n, k;
    cin >> n >> k;
    vector<ll> a(n);
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
    }
    sort(a.begin(), a.end());
    multiset<int> st;
    for (int i = 1; i < k; i++)
    {
        st.insert(a[i] - a[i - 1]);
    }
    ll ans = *st.begin() * (ll)(a[k - 1] - a[0]);
    for (int i = k; i < n; i++)
    {
        st.erase(st.find(a[i - k + 1] - a[i - k]));
        st.insert(a[i] - a[i - 1]);
        ans = min(ans, *st.begin() * (ll)(a[i] - a[i - k + 1]));
    }
    cout << ans << '\n';
    return 0;
}
```

## G

额。。。出这个题的意义是什么。。写了一个多小时，格式化之后三百多行。。。

后面发现小的 9 打错了。

```cpp
constexpr ll INF = 1e18;
 
ll ksm(__int128 x, __int128 y)
{
    __int128 res = 1;
    while (y)
    {
        if (y & 1)
            res = res * x;
        if (res > INF || x > INF)
            return -1LL;
        x = x * x;
        y >>= 1;
    }
    return (ll)res;
}
 
void man()
{
    vector<string> ans(10, string(1, '.'));
    auto Ins1 = [&](int x)
    {
        for (int i = 0; i < 10; i++)
            ans[i] += string(8, '.');
        int End = ans[0].size() - 2;
        if (x == 0)
        {
            for (int i = 2; i < 9; i++)
            {
                ans[i][End] = x + '0';
                ans[i][End - 6] = x + '0';
            }
            for (int i = End; i > End - 7; i--)
            {
                ans[2][i] = x + '0';
                ans[8][i] = x + '0';
            }
        }
        else if (x == 1)
        {
            for (int i = 2; i < 9; i++)
                ans[i][End] = x + '0';
        }
        else if (x == 2)
        {
            for (int i = End; i > End - 7; i--)
            {
                ans[2][i] = x + '0';
                ans[8][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[3][End] = ans[4][End] = x + '0';
            ans[6][End - 6] = ans[7][End - 6] = x + '0';
        }
        else if (x == 3)
        {
            for (int i = End; i > End - 7; i--)
            {
                ans[2][i] = x + '0';
                ans[8][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[3][End] = ans[4][End] = x + '0';
            ans[6][End] = ans[7][End] = x + '0';
        }
        else if (x == 4)
        {
            for (int i = 2; i < 9; i++)
                ans[i][End] = x + '0';
            for (int i = 2; i < 6; i++)
                ans[i][End - 6] = x + '0';
            for (int i = End; i > End - 7; i--)
                ans[5][i] = x + '0';
        }
        else if (x == 5)
        {
            for (int i = End; i > End - 7; i--)
            {
                ans[2][i] = x + '0';
                ans[8][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[3][End - 6] = ans[4][End - 6] = x + '0';
            ans[6][End] = ans[7][End] = x + '0';
        }
        else if (x == 6)
        {
            for (int i = End; i > End - 7; i--)
            {
                ans[2][i] = x + '0';
                ans[8][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[3][End - 6] = ans[4][End - 6] = x + '0';
            ans[6][End - 6] = ans[7][End - 6] = x + '0';
            ans[6][End] = ans[7][End] = x + '0';
        }
        else if (x == 7)
        {
            for (int i = End; i > End - 7; i--)
                ans[2][i] = x + '0';
            for (int i = 2; i < 9; i++)
                ans[i][End] = x + '0';
        }
        else if (x == 8)
        {
            for (int i = 2; i < 9; i++)
            {
                ans[i][End] = x + '0';
                ans[i][End - 6] = x + '0';
            }
            for (int i = End; i > End - 7; i--)
            {
                ans[5][i] = x + '0';
                ans[2][i] = x + '0';
                ans[8][i] = x + '0';
            }
        }
        else if (x == 9)
        {
            for (int i = End; i > End - 7; i--)
            {
                ans[2][i] = x + '0';
                ans[8][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[3][End] = ans[4][End] = x + '0';
            ans[6][End] = ans[7][End] = x + '0';
            ans[3][End - 6] = ans[4][End - 6] = x + '0';
        }
        else
        {
            for (int i = End; i >= End - 6; i--)
                ans[4][i] = ans[6][i] = '=';
        }
    };
    auto Ins2 = [&](int x)
    {
        for (int i = 0; i < 10; i++)
            ans[i] += string(6, '.');
        int End = ans[0].size() - 2;
        if (x == 0)
        {
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
                ans[5][i] = x + '0';
            }
            for (int i = 1; i < 6; i++)
            {
                ans[i][End] = x + '0';
                ans[i][End - 4] = x + '0';
            }
        }
        else if (x == 1)
        {
            for (int i = 1; i < 6; i++)
            {
                ans[i][End] = x + '0';
            }
        }
        else if (x == 2)
        {
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
                ans[3][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[2][End] = x + '0';
            ans[4][End - 4] = x + '0';
        }
        else if (x == 3)
        {
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
                ans[3][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[2][End] = x + '0';
            ans[4][End] = x + '0';
        }
        else if (x == 4)
        {
            for (int i = 1; i < 6; i++)
            {
                ans[i][End] = x + '0';
            }
            for (int i = End; i >= End - 4; i--)
            {
                ans[3][i] = x + '0';
            }
            ans[1][End - 4] = x + '0';
            ans[2][End - 4] = x + '0';
        }
        else if (x == 5)
        {
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
                ans[3][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[4][End] = x + '0';
            ans[2][End - 4] = x + '0';
            // ans[4][End - 4] = x + '0';
        }
        else if (x == 6)
        {
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
                ans[3][i] = x + '0';
                ans[5][i] = x + '0';
            }
            ans[4][End - 4] = x + '0';
            ans[4][End] = x + '0';
            ans[2][End - 4] = x + '0';
        }
        else if (x == 7)
        {
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
            }
            for (int i = 1; i < 6; i++)
            {
                ans[i][End] = x + '0';
            }
        }
        else if (x == 8)
        {
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
                ans[3][i] = x + '0';
                ans[5][i] = x + '0';
            }
            for (int i = 1; i < 6; i++)
            {
                ans[i][End] = x + '0';
                ans[i][End - 4] = x + '0';
            }
        }
        else if (x == 9)
        {
            ans[2][End] = x + '0';
            ans[4][End] = x + '0';
            ans[2][End - 4] = x + '0';
            for (int i = End; i >= End - 4; i--)
            {
                ans[1][i] = x + '0';
                ans[3][i] = x + '0';
                ans[5][i] = x + '0';
            }
        }
        else
        {
        }
    };
 
    // for (int i = 1; i <= 9; i++)
    // {
    //     Ins1(i);
    //     Ins2(i);
    // }
    // for (auto x : ans)
    //     cout << x << '\n';
    // cout << '\n';
    // return;
    string s;
    cin >> s;
    ll X = 0, Y = 0;
    {
        string tmp;
        for (int i = 0; i < s.size(); i++)
        {
            if (s[i] < '0' || s[i] > '9')
                break;
            tmp.push_back(s[i]);
        }
        auto get = [&]()
        {
            ll res = 0;
            for (auto x : tmp)
            {
                res = res * 10 + x - '0';
            }
            return res;
        };
        for (auto x : tmp)
            Ins1(x - '0');
        X = get();
        tmp = "";
 
        for (int i = s.size() - 2;; i--)
        {
            if (s[i] < '0' || s[i] > '9')
                break;
            tmp.push_back(s[i]);
        }
        reverse(tmp.begin(), tmp.end());
        Y = get();
        for (auto x : tmp)
            Ins2(x - '0');
    }
    Ins1(-1);
    ll res = ksm(X, Y);
    if (res == -1)
    {
        ans[0] += "........................";
        ans[1] += "........................";
        ans[2] += "IIIIIII.N.....N.FFFFFFF.";
        ans[3] += "...I....NN....N.F.......";
        ans[4] += "...I....N.N...N.F.......";
        ans[5] += "...I....N..N..N.FFFFFFF.";
        ans[6] += "...I....N...N.N.F.......";
        ans[7] += "...I....N....NN.F.......";
        ans[8] += "IIIIIII.N.....N.F.......";
        ans[9] += "........................";
    }
    else
    {
        string tmp = to_string(res);
        for (auto x : tmp)
            Ins1(x - '0');
    }
    for (auto x : ans)
        cout << x << '\n';
    cout << '\n';
}
```

## H

这个还好，简单分类讨论一下。

```cpp
void man()
{
    int n, k;
    cin >> n >> k;
    // if (k == 1)
    // {
    //     cout << n << " " << n << '\n';
    //     return;
    // }
    if (k & 1)
    {
        int cnt = k - 1;
        if (cnt >= n * 2)
        {
            // cerr << n << " " << k << '\n';
            cout << 0 << " " << 2 * n << '\n';
        }
        else
        {
            cout << n - (cnt / 2) << " " << n - (cnt / 2) + cnt << '\n';
        }
    }
    else
    {
        // 0.5
        int cnt = k - 1;
        if (cnt >= n * 2)
        {
            cout << 0 << " " << 2 * n << '\n';
        }
        else
        {
            cout << n - (cnt / 2) << " " << n - (cnt / 2) + cnt << '\n';
        }
    }
}
```