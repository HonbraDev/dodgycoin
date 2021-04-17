import { UUID } from "@dogehouse/kebab";
import { createClient } from "@supabase/supabase-js";
import { SupaUser } from "../typings/Database";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE!
);

const getUser = async (id: UUID): Promise<SupaUser> => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error) throw error;
  if (!data)
    throw "The SupaBase library drank too much Kofola and had to go home. [ERR-RETURN-DATA-NULL]";
  if (!data[0]) return { id, money: 0, isAdmin: false, fake: true };
  return data[0];
};

const setMoney = async (id: UUID, money: number) => {
  let snapshot = await getUser(id);
  if (snapshot.fake) {
    delete snapshot.fake;
    snapshot.money = money;
    const { error } = await supabase.from("users").insert(snapshot);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("users")
      .update({ money })
      .eq("id", id);
    if (error) throw error;
  }
};

const addMoney = async (id: UUID, money: number) => {
  try {
    const initialSnapshot = await getUser(id);
    await setMoney(id, initialSnapshot.money + money);
  } catch (e) {
    throw e;
  }
};

const linkAccount = async (id: UUID, githubId: string) => {
  let snapshot = await getUser(id);
  if (snapshot.fake) {
    snapshot.githubId = githubId;
    const { error } = await supabase.from("users").insert(snapshot);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("users")
      .update({ githubId })
      .eq("id", id);
    if (error) throw error;
  }
};

export { getUser, addMoney, setMoney, linkAccount };
